require('dotenv').config();     // calling dotenv to load environment variables , ye always top pe ayega

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');       // Importing CORS for frontend se backend ko connect karne ke liye
const bcrypt = require("bcryptjs");

const ipoRoutes= require('./Routes/ipoRoutes');   // Importing the routes for IPOs
const scrapeIpoData = require('./scraper/scrapeIpos');
const feedbackRoute = require('./Routes/feedbackRoute');

const authRoutes = require('./Routes/authRoutes');  // Importing the authentication routes
const userRoutes = require('./Routes/userRoutes');

const app = express();

app.use(cors({
  // origin: "https://ipo-live-tracker.netlify.app",       // Replace with your frontend URL
  origin: ["http://localhost:5173", "https://ipo-live-tracker.netlify.app"],
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods Requests
  credentials: true
}));

app.use(express.json());    // Middleware to parse JSON bodies

//! default route testing:           https://localhost:5000/
app.get('/', (req, res) => {
    res.send('Welcome to the server backend running perfectly!');
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// get Request
app.get('/api/scrape', async (req, res) => {
  try {
    await scrapeIpoData();
    res.status(200).send("✅ Scraping complete via manual route");
  } 
  catch (err) {
    console.error("❌ Error running manual scrape:", err.message);
    res.status(500).send("❌ Scraping failed");
  }
});


// port and db connection:
const PORT = process.env.PORT || 5000;          // server running at 5000 port

//! ab Db connection banayenge using mongoose
// Connect to MongoDB using Mongoose
// dotenv file se MONGO_URI ko use karenge

mongoose.connect(process.env.MONGO_URI)         // connecting with DB
  .then(async () => {
    console.log("✅ MongoDB Connected");

    // ✅ First scrape after DB connected
    await scrapeIpoData();

    // 🔁 Run every 15 minutes
    // setInterval(scrapeIpoData, 15 * 60 * 1000);

    // 🔁 Run every 120 minutes for testing
    setInterval(scrapeIpoData, 240 * 60  * 1000);

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost: ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ DB Connection error:", err.message);
  });


app.use('/api', ipoRoutes);  // Using the IPO routes for all API requests

app.use('/api/feedback', feedbackRoute); // Using the feedback route for feedback requests

app.use('/api/auth', authRoutes);


app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});








// http://localhost:5000/api/ipos            will be the link
// idhr sara data get kia h