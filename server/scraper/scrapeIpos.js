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

    await page.goto(process.env.SITE_URL, {
      waitUntil: 'networkidle0',
    });

    const ipoData = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll("#report_table tbody tr"));

      const getText = (row, label) => {
        const td = row.querySelector(`td[data-label="${label}"]`);
        if (!td) return "";
        const div = td.querySelector("div");
        return (div ? div.innerText : td.innerText).trim();
      };

      return rows.map(row => {
        const name = getText(row, "Name");
        if (!name) return null;

        const baseName = name.split("IPO")[0].trim();

        return {
          name,
          baseName,
          gmp: getText(row, "GMP"),
          rating: getText(row, "Rating"),
          sub: getText(row, "Sub"),
          price: getText(row, "Price (₹)"),
          ipoSize: getText(row, "IPO Size (₹ in cr)"),
          // price: price.replace(/[₹,]/g, ""),
          // ipoSize: ipoSize.replace(/[₹,]/g, ""),

          lotSize: parseInt(getText(row, "Lot")) || undefined,
          openDate: getText(row, "Open"),
          closeDate: getText(row, "Close"),
          boadate: getText(row, "BoA Dt"),
          listingDate: getText(row, "Listing"),
          ipoType: name.toLowerCase().includes("sme") ? "SME" : "Mainboard",
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
