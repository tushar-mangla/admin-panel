const express = require("express");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const router = express.Router();
const dotenv = require("dotenv").config();
const port = process.env.PORT;

const url =
  "mongodb+srv://login:Tushar%40123%23@cluster0.otykb.mongodb.net/login-database?authSource=admin&replicaSet=atlas-kjissj-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";

const dbName = "login-database";
const client = new MongoClient(url);

const username = "admin@gmail.com";
const pass = "admin@123#";

const reqDetails = { email: "", password: "" };

router.get("/", async (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  try {
    reqDetails.email = req.body.email;
    reqDetails.password = req.body.password;
    res.redirect("/data");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/data", async (req, res) => {
  try {
    if (reqDetails.email === username && reqDetails.password === pass) {
      const db = client.db(dbName);
      const collection = db.collection("users");

      collection.find({}).toArray((err, data) => {
        assert.equal(err, null);
        res.render("index", { users: data });
      });
    } else {
      // console.log(`${reqDetails.email} and pass is ${reqDetails.password}`);
      res.status(403).redirect("/");
    }
  } catch (e) {
    console.log(e);
    res.status(400).redirect("/");
  }
});

router.get("/logout", async (req, res) => {
  try {
    reqDetails.email = "";
    reqDetails.password = "";
    res.redirect("/");
  } catch (e) {
    res.status(400).send(e);
  }
});

client.connect((err) => {
  assert.equal(null, err);
  console.log("Connected successfully to mongo data");
});

module.exports = router;
