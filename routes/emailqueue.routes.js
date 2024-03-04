const router = require("express").Router();
const {
  EmailQueueController,
} = require("../controllers/EmailQueue.controller");
const tokenverification = require("../middleware/token-verification");

router.post(
  "/createmail/:listid",
  [tokenverification],
  EmailQueueController.createEmail
);

module.exports = router;
