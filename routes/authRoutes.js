const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  getRole,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/logout", logoutController);

router.get("/get-role", getRole);

module.exports = router;
