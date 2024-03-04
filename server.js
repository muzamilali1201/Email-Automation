const express = require("express");
require("dotenv").config();
require("express-async-errors");
const DbConnection = require("./config/DbConnection");
const router = require("./routes/router");
const errorHandler = require("./middleware/error-handler");
const mailScheduler = require("./utils/mailScheduler");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v2", router);
app.use(errorHandler);
app.listen(process.env.PORT || 3000, () => {
  mailScheduler();
  DbConnection();
  console.log(`Server is running at PORT : ${process.env.PORT}`);
});
