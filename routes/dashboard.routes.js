const { dashboardController } = require("../controllers/dashboard.controller");
const tokenverification = require("../middleware/token-verification");

const router = require("express").Router();

router.get("/dashboard", [tokenverification], dashboardController.mailTracker);

module.exports = router;
