const router = require("express").Router();
const {
  subscriberController,
} = require("../controllers/subscriber.controller");
const tokenverification = require("../middleware/tokenverification");

router.post("/:listid", subscriberController.subscribeUser);
router.get("/", [tokenverification], subscriberController.getAllSubscribers);
router.delete(
  "/:subscriberid",
  [tokenverification],
  subscriberController.removeSubscriberById
);

module.exports = router;
