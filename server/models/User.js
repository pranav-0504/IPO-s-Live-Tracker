const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    
    username: { type: String, required: true, unique: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    // ✅ Wishlist: Array of IPO references
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IPO"
      }
    ]
    
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);             // hash krdia h password ko
  next();
});

// User Schema
module.exports = mongoose.model('User', userSchema);