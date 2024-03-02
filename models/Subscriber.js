const mongoose = require("mongoose");

const subscriberSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  listid: String,
});

module.exports = mongoose.model("Subscriber", subscriberSchema);
