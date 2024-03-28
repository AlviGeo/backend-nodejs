let express = require("express");
let router = express.Router();
const userController = require("../controllers/auth");
const verifyToken = require("../middleware/token");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("masuk");
});

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/logout", verifyToken, userController.logout);

router.post("/reset-password", verifyToken, userController.resetPassword);

module.exports = router;
