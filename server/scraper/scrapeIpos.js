require('dotenv').config({ path: '../.env' });

const isProduction = process.env.NODE_ENV === 'production';

const puppeteer = isProduction
  ? require('puppeteer-core')
  : require('puppeteer');
const chromium = isProduction ? require('chrome-aws-lambda') : null;

const IPO = require('../models/ipo');

const scrapeIpoData = async () => {
  let browser;

  try {
    console.log("📍 Environment:", isProduction ? "Production (Render)" : "Local");

    browser = await puppeteer.launch(
      isProduction
        ? {
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
          }
        : {
            headless: true, // local default
          }
    );

    const page = await browser.newPage();
    await page.goto('https://www.investorgain.com/report/live-ipo-gmp/331/all/', {
      waitUntil: 'networkidle0',
    });

    // ✅ scraping logic (same as before)
    const ipoData = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('#report_table tbody tr'));
      return rows.map(row => {
        const cols = row.querySelectorAll('td');
        if (cols.length < 5) return null;

        const get = (label) =>
          Array.from(cols).find(td => td.getAttribute('data-label') === label)?.textContent.trim() || '';

        const name = get('Name');
        const baseName = name.split('IPO')[0].trim();

        if (!baseName || !name) return null;

        return {
          name,
          baseName,
          gmp: get('GMP'),
          price: get('Price'),
          estListing: get('Est Listing'),
          sub: get('Sub'),
          ipoSize: get('IPO Size'),
          lotSize: parseInt(get('Lot')) || undefined,
          openDate: get('Open'),
          closeDate: get('Close'),
          boadate: get('BoA Dt'),
          listingDate: get('Listing'),
          ipoType: name.toLowerCase().includes('sme') ? 'SME' : 'Mainboard',
        };
      }).filter(Boolean);
    });

    console.log(`🔍 Fetched ${ipoData.length} IPO rows`);

    for (const ipo of ipoData) {
      try {
        const saved = await IPO.findOneAndUpdate(
          { baseName: ipo.baseName },
          {
            $set: {
              ...ipo,
              gmpUpdatedAt: new Date(),
            },
          },
          { upsert: true, new: true }
        );

        console.log("✅ Saved:", saved.name);
      } catch (err) {
        console.error("❌ DB Error:", err.message);
      }
    }

    await browser.close();
    const total = await IPO.countDocuments();
    console.log(`📊 Total IPOs in DB now: ${total}`);
  } catch (err) {
    console.error("❌ Error:", err.message);
    if (browser) await browser.close();
  }
};

module.exports = scrapeIpoData;
