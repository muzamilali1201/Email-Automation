const router = require("express").Router();
const userRoutes = require("../routes/user.routes");
const subscriberRoutes = require("../routes/subscriber.routes");
const listRoutes = require("./list.routes");
const EmailQueueRoutes = require("../routes/emailqueue.routes");
const dashboardRoutes = require("../routes/dashboard.routes");

router.use("/user", userRoutes);
router.use("/subscriber", subscriberRoutes);
router.use("/list", listRoutes);
router.use("/email-queue", EmailQueueRoutes);
router.use("/", dashboardRoutes);

module.exports = router;
