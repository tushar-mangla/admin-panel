const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const ejs = require("ejs");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const { kStringMaxLength } = require("buffer");
const dotenv = require("dotenv").config({ path: "./.env" });
const exp = require("constants");
const port = process.env.PORT || 3000;
const router = express.Router();
const bodyparser = require("body-parser");
const controller = require("./controller/controller");
const passport = require("passport");
const initPassport = require("./passport-config");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);
app.use(bodyparser.json());

const table_path = path.join(__dirname, "Admin_panel/table");
const style_path = path.join(__dirname, "Admin_panel/login");

app.set("view engine", "ejs");
app.use(express.static(style_path));
app.set("views", table_path);

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride("_method"));

// const schema = {
//   firstname: String,
//   lastname: String,
//   email: String,
//   contact: Number,
//   city: String,
//   age: Number,
// };

app.listen(port, function () {
  console.log(`Server is running on ${port}`);
});

app.use("/", controller);
