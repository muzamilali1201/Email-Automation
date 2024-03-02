const mongoose = require("mongoose");

const DbConnection = async (req, res) => {
  await mongoose.connect(process.env.DB_URL);
};

module.exports = DbConnection;
