const express = require("express");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

require("dotenv").config();
require("./models/db");
require("./passport");
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

// Use express-session before passport.initialize() and passport.session()
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      collectionName: "sessions",
    }),
    // cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set("trust proxy", 1); // trust first proxy

app.use("/", authRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.use((req, res, next) => {
  res.status(404).json({
    message: "Route Not Found",
  });
  next();
});

app.use((error, req, res, next) => {
  res.status(500).json({
    message: "Internal Server Error",
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
