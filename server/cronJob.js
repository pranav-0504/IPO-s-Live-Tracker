const cron = require("node-cron");
const runScraper = require("./scraper/scrapeIpos");

// Run scraper every 15 minutes: will scrape data every 15 minutes dynamically!
cron.schedule("*/15 * * * *", async () => {
  console.log("⏱️ Running scheduled IPO scraping...");
  await runScraper();
});


