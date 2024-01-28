const express = require("express");
const passport = require("passport");
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
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/profile",
  })
);

module.exports = router;
