const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const ejs = require("ejs");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const { kStringMaxLength } = require("buffer");
const exp = require("constants");
const port = 3000;
const router = express.Router();
const bodyparser = require("body-parser");
const controller = require("./controller/controller");

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());

const table_path = path.join(__dirname, "Admin_panel/table");
const style_path = path.join(__dirname, "Admin_panel/login");

app.set("view engine", "ejs");
app.use(express.static(style_path));
app.set("views", table_path);

const schema = {
  firstname: String,
  lastname: String,
  email: String,
  contact: Number,
  city: String,
  age: Number,
};

app.listen(port, function () {
  console.log(`Server is running on ${port}`);
});

app.use(controller);
