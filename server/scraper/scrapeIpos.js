require('dotenv').config({ path: '../.env' });

const puppeteer = require('puppeteer');
const IPO = require('../models/ipo');

const scrapeIpoData = async () => {
  try {
    
    console.log("✅ Connected to MongoDB Atlas Sucessfully");

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto('https://www.investorgain.com/report/live-ipo-gmp/331/all/', {
      waitUntil: 'networkidle0',
    });

    // ✅ Scrape data WITHOUT gmpUpdatedAt
    const ipoData = await page.evaluate(() => {
      
      const rows = Array.from(document.querySelectorAll('#report_table tbody tr'));     //! Most Important line to scrape data from the table id = report_table and in tbody tag all <tr> all rows of the table
      
      return rows.map(row => {
        const cols = row.querySelectorAll('td');
        if (cols.length < 5) return null;

        const get = (label) =>
          Array.from(cols).find(td => td.getAttribute('data-label') === label)?.textContent.trim() || '';

        const name = get('Name');
        const baseName = name.split('IPO')[0].trim();   // Extract base name before "IPO"   // to avoid duplicates due to suffix change after closing or ipo listing

        if (!baseName) return null;                     // If no base name, skip this row
        if (!name) return null;

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
        const saved = await IPO.findOneAndUpdate(         // We have to update gmp etc.
          // { name: ipo.name },
          {baseName: ipo.baseName},     // 👈 Match using baseName
          {
            $set: {
              ...ipo,             // ! updating all fields from the scraped data
              gmpUpdatedAt: new Date(), // ✅ Properly added from Node.js
            },
          },
          { upsert: true, new: true }       // 👈 If not found, insert; else update the data
        );

        console.log("✅ Saved:", saved.name);
      } catch (err) {
        console.error("❌ DB Error:", err.message);
      }
    }

    await browser.close();
    const total = await IPO.countDocuments();
    console.log(`📊 Total IPOs in DB now: ${total}`);

    console.log("🔌 Disconnected from MongoDB Atlas");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
};

module.exports = scrapeIpoData;  // Exporting the function to be used in cron job
