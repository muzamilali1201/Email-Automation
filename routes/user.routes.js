const router = require("express").Router();
const { userController } = require("../controllers/user.controller");

router.post("/register", userController.userRegister);
router.post("/verify", userController.userVerify);
router.post("/login", userController.userLogin);

module.exports = router;
