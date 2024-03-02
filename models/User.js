const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  organizationName: String,
  verified: {
    type: String,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
