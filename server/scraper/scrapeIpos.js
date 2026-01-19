require("dotenv").config({ path: "../.env" });

const puppeteer = require("puppeteer");
const IPO = require("../models/ipo");

const scrapeIpoData = async () => {
  let browser;

  try {
    console.log("📍 Environment:", process.env.NODE_ENV);

    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // 🛡️ Anti-bot user agent
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
    );

    await page.goto(process.env.SITE_URL, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    /* ===================== SCRAPING ===================== */

    const ipoData = await page.evaluate(() => {
      const rows = Array.from(
        document.querySelectorAll("#report_table tbody tr")
      );

      const getText = (row, label) => {
        const td = row.querySelector(`td[data-label="${label}"]`);
        if (!td) return "";
        const div = td.querySelector("div");
        return (div ? div.innerText : td.innerText).trim();
      };

      return rows
        .map((row) => {
          const name = getText(row, "Name");
          if (!name) return null;

          // 🔑 Stable key
          const baseName = name
            .toLowerCase()
            .replace(/ipo.*$/i, "")
            .replace(/\s+/g, " ")   // 🔥 THIS WAS MISSING
            .trim();


          // ✅ EXPLICIT STATUS (NO GUESSWORK IN FRONTEND)
          const status = name.includes("CAllotted")
            ? "C"
            : /\sU$/.test(name)
            ? "U"
            : /\sO$/.test(name)
            ? "O"
            : /\sC$/.test(name)
            ? "C"
            : "U";

          return {
            name,
            baseName,
            status, // ⭐ IMPORTANT
            gmp: getText(row, "GMP"),
            rating: getText(row, "Rating"),
            sub: getText(row, "Sub"),
            price: getText(row, "Price (₹)"),
            ipoSize: getText(row, "IPO Size (₹ in cr)"),
            lotSize: parseInt(getText(row, "Lot")) || null,
            openDate: getText(row, "Open"),
            closeDate: getText(row, "Close"),
            boadate: getText(row, "BoA Dt"),
            listingDate: getText(row, "Listing"),
            ipoType: name.toLowerCase().includes("sme")
              ? "SME"
              : "Mainboard",
          };
        })
        .filter(Boolean);
    });

    console.log(`🔍 Fetched ${ipoData.length} IPO rows`);

    /* ===================== DB UPDATE ===================== */

    const currentYear = new Date().getFullYear();
    const today = new Date();

    let updated = 0;
    let skipped = 0;

    for (const ipo of ipoData) {
      try {
        // 🧹 Clean close date
        const cleanCloseDate = ipo.closeDate.split("GMP")[0].trim();
        const [day, month] = cleanCloseDate.split("-");
        const formattedCloseDate = new Date(
          `${month} ${day} ${currentYear}`
        );

        if (isNaN(formattedCloseDate.getTime())) {
          skipped++;
          continue;
        }

        const diffInDays =
          (today - formattedCloseDate) / (1000 * 60 * 60 * 24);

        // ⏳ Ignore very old IPOs
        if (diffInDays > 50) {
          skipped++;
          continue;
        }

        /* 🧠 SMART MERGE (NO BLANK OVERWRITE) */
        const updateFields = {
          name: ipo.name,
          baseName: ipo.baseName,
          status: ipo.status,
          gmp: ipo.gmp,
          rating: ipo.rating,
          sub: ipo.sub,
          openDate: ipo.openDate,
          closeDate: ipo.closeDate,
          boadate: ipo.boadate,
          listingDate: ipo.listingDate,
          ipoType: ipo.ipoType,
          gmpUpdatedAt: new Date(),
          closingDate: formattedCloseDate,
        };

        if (ipo.price) updateFields.price = ipo.price;
        if (ipo.ipoSize) updateFields.ipoSize = ipo.ipoSize;
        if (ipo.lotSize) updateFields.lotSize = ipo.lotSize;

        await IPO.findOneAndUpdate(
          { baseName: ipo.baseName },
          { $set: updateFields },
          { upsert: true, new: true }
        );

        updated++;
      } catch (err) {
        console.error("❌ DB Error:", err.message);
      }
    }

    await browser.close();

    console.log(`✔️ Updated: ${updated}`);
    console.log(`❌ Skipped: ${skipped}`);

    /* ===================== CLEANUP ===================== */

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 14);

    const deleted = await IPO.deleteMany({
      closingDate: { $lt: cutoffDate },
    });

    console.log(
      `🗑️ Deleted ${deleted.deletedCount} IPOs closed > 14 days ago`
    );
  } catch (err) {
    console.error("❌ Scraper Error:", err.message);
    if (browser) await browser.close();
  }
};

module.exports = scrapeIpoData;



