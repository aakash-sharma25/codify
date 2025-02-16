const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  getRole,
  getLoginTime,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/logout", logoutController);

router.get("/get-role", getRole);

router.post("/get-session",getLoginTime)

module.exports = router;
