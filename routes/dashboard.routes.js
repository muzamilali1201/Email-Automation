const { dashboardController } = require("../controllers/dashboard.controller");
const tokenverification = require("../middleware/tokenverification");

const router = require("express").Router();

router.get("/dashboard", [tokenverification], dashboardController.mailTracker);

module.exports = router;
