const passport = require("passport");
const passport_local = require("passport-local");
const bcrypt = require("bcrypt");
const { Passport } = require("passport");
const admin = require("../model/model");

Localstrategy = passport_local.Strategy;

passport.use(
  new Localstrategy(
    {
      usernameField: "admin@gmail.com",
      passwordField: "admin@123#",
    },
    function (email, password, done) {}
  )
);
