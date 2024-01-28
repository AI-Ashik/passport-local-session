const bcrypt = require("bcrypt");
const Auth = require("../models/auth.model");

exports.authHome = (req, res) => {
  res.render("index");
};

exports.authRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Auth({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({
      message: "user is created",
    });
  } catch (error) {
    res.status(500).json({
      message: "something was broke",
    });
  }
};

exports.authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({ email });
    if (user && user.length > 0) {
      const pass = await bcrypt.compare(password, user.password);
      if (pass) {
        res.status(200).json({
          message: "user is valid",
        });
      } else {
        res.status(401).json({
          message: "user is not valid",
        });
      }
    } else {
      res.status(401).json({
        message: "user is not valid",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "something was broke",
    });
  }
};
