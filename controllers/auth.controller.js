const bcrypt = require("bcrypt");
const passport = require("passport");

const User = require("../models/auth.model");
// all get request for the routes
exports.Register = (req, res) => {
  res.status(200).render("register");
};
exports.Login = (req, res) => {
  res.status(200).render("login");
};
exports.Profile = (req, res) => {
  res.render("profile");
};

exports.Logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        message: "Error logging out",
        error: err,
      });
    }
    return res.redirect("/"); // Redirect to the home page or any other page after logout
  });
};

// post requests

// eslint-disable-next-line consistent-return
exports.authRegister = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) return res.status(400).send("user already exists");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();
    res.redirect("/login");
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.authLogin = passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/profile",
});

// checking if user already logged in or not
exports.checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
  return next();
};

exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
};
