require("dotenv").config();
require("./models/db");
const express = require("express");
const cors = require("cors");
const path = require("path");
const authRouter = require("./routes/auth.route");

const { PORT } = process.env;
const app = express();

app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", authRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.get((req, res, next) => {
  res.status(404).json({
    message: "Route Not Found",
  });
  next();
});

app.get((error, req, res, next) => {
  res.status(500).json({
    message: "Internal Server Error",
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
