const express = require("express");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const bcrypt = require("bcrypt");
const router = express.Router();
const dotenv = require("dotenv").config();
const passport = require("passport");
const initPassport = require("../passport-config");
const flash = require("express-flash");
const session = require("express-session");
const port = process.env.PORT || 3000;

const url =
  "mongodb+srv://login:Tushar%40123%23@cluster0.otykb.mongodb.net/login-database?authSource=admin&replicaSet=atlas-kjissj-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";

const dbName = "login-database";
const client = new MongoClient(url);

const username = "admin@gmail.com";
const pass = "admin@123#";

const user = [];

user.push({
  email: "admin@gmail.com",
  password: "admin@123# ",
});

console.log(user.email);

const reqDetails = { email: "", password: "" };

initPassport(
  passport,
  (email) => user.find((user) => user.email === email),
  (password) => user.find((user) => user.password === password)
);

router.get("/", checkNotAuthenticated, async (req, res) => {
  res.render("login");
});

router.post(
  "/",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/data",
    failureRedirect: "/",
    failureFlash: true,
  }),
  async (req, res) => {
    try {
      res.redirect("/data");
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

router.get("/data", checkAuthenticated, async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("users");

    collection.find({}).toArray((err, data) => {
      assert.equal(err, null);
      res.render("index", { users: data });
    });
  } catch (e) {
    console.log(e);
    res.status(400).render("login");
  }
});

router.delete("/logout", async (req, res) => {
  try {
    req.logOut();
    res.redirect("/");
  } catch (e) {
    res.status(400).send("sddv");
  }
});

client.connect((err) => {
  assert.equal(null, err);
  console.log("Connected successfully to mongo data");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/data");
  }

  next();
}

module.exports = router;
