const express = require('express');
const router = express.Router();

const Feedback = require('../models/feedback');  // ✅ Fix here

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newFeedback = new Feedback({ name, email, message });
    
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } 
  catch (err) {
    console.error(err);  // ✅ helpful for debugging
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;


// This route handles feedback submission. It expects a POST request with name, email, and message in the body.
// It saves the feedback to the database and returns a success message or an error if something goes


//! this is the post API for feedback submission
//! wrong. The feedback is stored in the MongoDB database using the Feedback model.