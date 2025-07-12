//  for IPO wishlist/bookmark etc

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const IPO = require("../models/ipo");

const authMiddleware = require("../middlewares/authMiddleWare");     // to decode JWT

// Get user's wishlist
router.get("/wishlist", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
});

// Add to wishlist
router.post("/bookmark/:ipoId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { ipoId } = req.params;

    if (!user.wishlist.includes(ipoId)) {
      user.wishlist.push(ipoId);
      await user.save();
    }

    res.json({ message: "IPO bookmarked" });
  } catch (err) {
    res.status(500).json({ message: "Failed to bookmark IPO" });
  }
});

// ❌ Remove from wishlist
router.delete("/bookmark/:ipoId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { ipoId } = req.params;

    user.wishlist = user.wishlist.filter(id => id.toString() !== ipoId);
    await user.save();

    res.json({ message: "IPO removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove IPO" });
  }
});

module.exports = router;
