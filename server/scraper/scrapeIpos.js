require('dotenv').config({ path: '../.env' });

const puppeteer = require('puppeteer');
const IPO = require('../models/ipo');

const scrapeIpoData = async () => {
  let browser;

  try {
    console.log("📍 Environment:", process.env.NODE_ENV);

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    //! Imp to setUserAgent to protect from bots on scraping website to get detected!
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
    );

    await page.goto('https://www.investorgain.com/report/live-ipo-gmp/331/all/', {
      waitUntil: 'networkidle0',
    });

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

    const currentYear = new Date().getFullYear();
    const today = new Date();

    let inserted = 0, skipped = 0;

    for (const ipo of ipoData) {
      try {
        const [day, month] = ipo.closeDate.split('-');
        const formattedCloseDate = new Date(`${month} ${day} ${currentYear}`);

        // 👉 Skip if IPO is closed more than 5 days ago
        const diffInDays = (today - formattedCloseDate) / (1000 * 60 * 60 * 24);
        if (diffInDays > 14) {
          skipped++;
          continue;
        }

        const saved = await IPO.findOneAndUpdate(
          { baseName: ipo.baseName },
          {
            $set: {
              ...ipo,
              gmpUpdatedAt: new Date(),
              closingDate: formattedCloseDate,
            },
          },
          { upsert: true, new: true }
        );

        console.log("✅ Saved:", saved.name);
        inserted++;

      } catch (err) {
        console.error("❌ DB Error:", err.message);
      }
    }

    await browser.close();
    const total = await IPO.countDocuments();
    console.log(`📊 Total IPOs in DB now: ${total}`);
    console.log(`✔️ Inserted: ${inserted}, ❌ Skipped (old): ${skipped}`);

    // Delete IPOs whose closingDate is more than 14 days ago
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 14);

    const deleted = await IPO.deleteMany({ closingDate: { $lt: cutoffDate } });
    console.log(`🗑️ Deleted ${deleted.deletedCount} old IPOs (closed > 14 days ago)`);



  } catch (err) {
    console.error("❌ Error:", err.message);
    if (browser) await browser.close();
  }
};

module.exports = scrapeIpoData;
