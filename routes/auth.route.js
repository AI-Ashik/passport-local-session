const express = require("express");
const {
  authRegister,
  Login,
  Register,
  Profile,
  Logout,
  authLogin,
  checkLoggedIn,
  checkAuthenticated,
} = require("../controllers/auth.controller");

const router = express.Router();

// GET requests
router.get("/login", checkLoggedIn, Login);
router.get("/register", Register);
router.get("/profile", checkAuthenticated, Profile);
router.get("/logout", Logout);

// POST requests
router.post("/register", authRegister);
router.post("/login", authLogin);

module.exports = router;
