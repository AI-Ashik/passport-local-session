// const Auth = require("../models/auth.model");

// all get request for the routes
exports.authRegister = async (req, res) => {
  res.status(200).render("register");
};
exports.authLogin = async (req, res) => {
  res.status(200).render("login");
};
exports.authProfile = async (req, res) => {
  res.status(200).render("profile");
};
exports.authLogout = async (req, res) => {
  res.status(200).redirect("/");
};
