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

        //! const baseName = name.split("IPO")[0].trim();
        const baseName = name
              .replace(/IPO.*$/i, "")
              .trim()
              .toLowerCase();

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
        const cleanCloseDate = ipo.closeDate.split("GMP")[0].trim();
        const [day, month] = cleanCloseDate.split("-");
        const formattedCloseDate = new Date(`${month} ${day} ${currentYear}`);

        const diffInDays = (today - formattedCloseDate) / (1000 * 60 * 60 * 24);
        if (diffInDays > 50) continue;

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

        console.log("✅ Updated:", saved.name);
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



// require("dotenv").config({ path: "../.env" });

// const puppeteer = require("puppeteer");
// const IPO = require("../models/ipo");

// const scrapeIpoData = async () => {
//   let browser;

//   try {
//     console.log("📍 Environment:", process.env.NODE_ENV);

//     browser = await puppeteer.launch({
//       headless: true,
//       args: ["--no-sandbox", "--disable-setuid-sandbox"],
//     });

//     const page = await browser.newPage();

//     // 🛡️ Anti-bot user agent
//     await page.setUserAgent(
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
//     );

//     await page.goto(process.env.SITE_URL, {
//       waitUntil: "networkidle0",
//       timeout: 60000,
//     });

//     // ---------------- SCRAPING ----------------
//     const ipoData = await page.evaluate(() => {
//       const rows = Array.from(
//         document.querySelectorAll("#report_table tbody tr")
//       );

//       const getText = (row, label) => {
//         const td = row.querySelector(`td[data-label="${label}"]`);
//         if (!td) return "";
//         const div = td.querySelector("div");
//         return (div ? div.innerText : td.innerText).trim();
//       };

//       return rows
//         .map((row) => {
//           const name = getText(row, "Name");
//           if (!name) return null;

//           const baseName = name
//             .replace(/IPO.*$/i, "")
//             .trim()
//             .toLowerCase();

//           return {
//             name,
//             baseName,
//             gmp: getText(row, "GMP"),
//             rating: getText(row, "Rating"),
//             sub: getText(row, "Sub"),
//             price: getText(row, "Price (₹)"),
//             ipoSize: getText(row, "IPO Size (₹ in cr)"),
//             lotSize: parseInt(getText(row, "Lot")) || undefined,
//             openDate: getText(row, "Open"),
//             closeDate: getText(row, "Close"),
//             boadate: getText(row, "BoA Dt"),
//             listingDate: getText(row, "Listing"),
//             ipoType: name.toLowerCase().includes("sme")
//               ? "SME"
//               : "Mainboard",
//           };
//         })
//         .filter(Boolean);
//     });

//     console.log(`🔍 Fetched ${ipoData.length} IPO rows`);

//     // ---------------- DB UPDATE ----------------
//     const currentYear = new Date().getFullYear();
//     const today = new Date();

//     let inserted = 0;
//     let skipped = 0;

//     for (const ipo of ipoData) {
//       try {
//         // Clean & parse close date
//         const cleanCloseDate = ipo.closeDate
//           .split("GMP")[0]
//           .trim();

//         const [day, month] = cleanCloseDate.split("-");
//         const formattedCloseDate = new Date(
//           `${month} ${day} ${currentYear}`
//         );

//         // 🛑 Invalid date protection
//         if (isNaN(formattedCloseDate.getTime())) {
//           console.warn(
//             "⚠️ Invalid close date:",
//             ipo.name,
//             ipo.closeDate
//           );
//           skipped++;
//           continue;
//         }

//         const diffInDays =
//           (today - formattedCloseDate) / (1000 * 60 * 60 * 24);

//         // ⏳ Skip very old IPOs
//         if (diffInDays > 50) {
//           skipped++;
//           continue;
//         }

//         const saved = await IPO.findOneAndUpdate(
//           { baseName: ipo.baseName },
//           {
//             $set: {
//               ...ipo,
//               gmpUpdatedAt: new Date(),
//               closingDate: formattedCloseDate,
//             },
//           },
//           { upsert: true, new: true }
//         );

//         console.log("✅ Updated:", saved.name);
//         inserted++;
//       } catch (err) {
//         console.error("❌ DB Error:", err.message);
//       }
//     }

//     await browser.close();

//     const total = await IPO.countDocuments();
//     console.log(`📊 Total IPOs in DB: ${total}`);
//     console.log(`✔️ Inserted/Updated: ${inserted}`);
//     console.log(`❌ Skipped: ${skipped}`);

//     // ---------------- CLEANUP ----------------
//     const cutoffDate = new Date();
//     cutoffDate.setDate(cutoffDate.getDate() - 14);

//     const deleted = await IPO.deleteMany({
//       closingDate: { $lt: cutoffDate },
//     });

//     console.log(
//       `🗑️ Deleted ${deleted.deletedCount} IPOs closed > 14 days ago`
//     );
//   } catch (err) {
//     console.error("❌ Scraper Error:", err.message);
//     if (browser) await browser.close();
//   }
// };

// module.exports = scrapeIpoData;
