const router = require("express").Router();
const { ListController } = require("../controllers/list.controller");
const tokenverification = require("../middleware/token-verification");

router.post("/", [tokenverification], ListController.addList);
router.get("/:listid", [tokenverification], ListController.selectList);
router.delete("/:listid", [tokenverification], ListController.removeList);

module.exports = router;
