const IPO = require("../models/ipo");

const cleanOldIpos = async () => {
  try {
    const today = new Date();

    // 7 din purani date nikali
    const thresholdDate = new Date(today);
    thresholdDate.setDate(thresholdDate.getDate() - 16);             // jo bhi ipo 5 din se purana hai, usko delete karenge mtlb jiski clsing date 5 din se purani hai

    // Ab sirf un IPOs ko delete karega jinka closingDate 16 din se purana hai
    const deleted = await IPO.deleteMany({ closingDate: { $lt: thresholdDate } });

    console.log(`🧹 Deleted ${deleted.deletedCount} IPOs that closed over 16 days ago!`);
  } catch (err) {
    console.error("❌ Error in cleaning old IPOs:", err.message);
  }
};

module.exports = cleanOldIpos;
