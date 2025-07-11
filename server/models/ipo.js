const mongoose = require("mongoose");

const ipoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  baseName: { type: String, required: true, unique: true },   // Unique base name for matching
  gmp: { type: String },
  price: { type: String },
  estListing: { type: String },
  sub: { type: String },
  ipoSize: { type: String },
  lotSize: { type: Number },
  openDate: { type: String },
  closeDate: { type: String },
  boadate: { type: String },
  listingDate: { type: String },
  gmpUpdatedAt: { type: Date, default: Date.now },
  ipoType: { type: String, enum: ["Mainboard", "SME"], required: true },

  // For tracking IPOs that have closed and will delete them after 7 days from the database {for backend only}
  closingDate: { type: Date, required: true },

});

module.exports = mongoose.model("IPO", ipoSchema);
