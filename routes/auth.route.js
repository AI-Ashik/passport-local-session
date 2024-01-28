const express = require("express");
const {
  authRegister,
  Login,
  Register,
  Profile,
  Logout,
} = require("../controllers/auth.controller");

const router = express.Router();

// GET requests
router.get("/login", Login);
router.get("/register", Register);
router.get("/profile", Profile);
router.get("/logout", Logout);

// POST requests
router.post("/register", authRegister);
// router.post("/login", authLogin);

module.exports = router;
