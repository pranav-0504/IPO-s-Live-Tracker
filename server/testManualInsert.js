require('dotenv').config();

const mongoose = require('mongoose');
const IPO = require('./models/ipo');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const result = await IPO.create({
      name: 'Test IPO Manual',
      gmp: '₹50',
      price: '₹100-₹12000',
      estListing: '₹150',
      sub: '10x',
      ipoType: 'Mainboard',
    });

    console.log("✅ Manual Inserted IPO:", result);
    await mongoose.disconnect();
  })
  .catch((err) => {
    console.log("❌ Insert Error:", err.message);
  });
