const bcrypt = require("bcrypt");
const User = require("../models/auth.model");
// all get request for the routes
exports.Register = (req, res) => {
  res.status(200).render("register");
};
exports.Login = (req, res) => {
  res.status(200).render("login");
};
exports.Profile = (req, res) => {
  res.status(200).render("profile");
};
exports.Logout = (req, res) => {
  res.status(200).redirect("/");
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
    res.status(201).redirect("/login");
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
};
