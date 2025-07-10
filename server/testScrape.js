require('dotenv').config();

const mongoose = require('mongoose');

const scrapeIpoData = require('./scraper/scrapeIpos'); // 👈 this matches your file name

mongoose.set('debug', true);

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');

    await scrapeIpoData();

    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected');
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
