const mongoose = require("mongoose");

const ListSchmea = mongoose.Schema({
  userid: String,
  listname: String,
});

module.exports = mongoose.model("List", ListSchmea);
