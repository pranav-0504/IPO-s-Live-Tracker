const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = require('../middlewares/verifyJWTToken');

//! Post route for user registration
// This route allows users to register by providing a username, email, and password

//    /api/auth/register

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: "✅ Registered Successfully!" });
  } 
  catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//! Login route for user authentication Login
// This route allows users to log in by providing their email and password

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // idhr tk phoch gya mtlb id and password match ho gyi hai
    //! Now finally generate Web Token of the user:

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
        expiresIn: '2d',        // Token will expire in 2 days
    });

    res.json({ token, user: { id: user._id, username: user.username } });
  } 

  catch (err) {
    console.error("🔴 Login error:", err.message); 
    res.status(500).json({ error: "Login failed" });
  }
    //! What Just Happened?
    //! Email + Password correct the
    //! Server ne check kara password via bcrypt.compare(...)
    //! Fir ek JWT token generate kara:

});

// Secure route to get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // remove password
    
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.json(user);
  } 
  catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});



module.exports = router;
