const mongoose = require("mongoose");

const verificationSchema = mongoose.Schema({
  userid: String,
  token: String,
  expireAt: {
    type: Date,
    default: Date.now(),
    expire: 360,
  },
});

module.exports = mongoose.model("Verification", verificationSchema);
