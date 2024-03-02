const mongoose = require("mongoose");

const emailQueueSchema = mongoose.Schema({
  subject: String,
  text: String,
  send: {
    type: Boolean,
    default: false,
  },
  listid: String,
  timetosend: Date,
});

module.exports = mongoose.model("EmailQueue", emailQueueSchema);
