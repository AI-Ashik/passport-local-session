const express = require("express");
const {
  authRegister,
  authLogin,
  authLogout,
  authProfile,
} = require("../controllers/auth.controller");

const router = express.Router();

router.get("/register", authRegister);
router.get("/login", authLogin);
router.get("/profile", authProfile);
router.get("/logout", authLogout);

module.exports = router;
