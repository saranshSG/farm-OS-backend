const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

///api/auth/register
router.post("/register", authController.register);

///api/auth/registerFarm
router.post("/registerFarm", authController.registerFarm);

///api/auth/checkEmail
router.post("/checkEmail", authController.checkEmail);

///api/auth/signin
router.post("/signin", authController.signin);

///api/auth/isauth
router.get("/isauth", auth(), authController.isauth);

module.exports = router;
