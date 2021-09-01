// const express = require("express");
// const MongoClient = require("mongodb").MongoClient;
// const hbs = require("hbs");
// const path = require("path");

// // const url =
// //   "mongodb+srv://login:Tushar%40123%23@cluster0.otykb.mongodb.net/login-database?authSource=admin&replicaSet=atlas-kjissj-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";
// // const dbName = "login-database";
// // const client = new MongoClient();

// var firstname;

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// const table_path = path.join(__dirname, "Admin_panel/table");

// app.set("view engine", "hbs");
// app.set("views", table_path);

// var database;
// let user;

// app.get("/table", (req, res) => {
//   database
//     .collection("users")
//     .find({})
//     .toArray((err, result) => {
//       if (err) throw err;
//       // firstname = result.body.firstname;
//       // console.log(firstname);
//       res.send(result);
//     });
// });

// app.get("/data", (req, res) => {
//   console.log(typeof database);
//   res.send("sdvsdv");
// });

// app.listen(3000, () => {
//   MongoClient.connect(
//     "mongodb+srv://login:Tushar%40123%23@cluster0.otykb.mongodb.net/login-database?authSource=admin&replicaSet=atlas-kjissj-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     (err, result) => {
//       if (err) throw err;
//       database = result.db("login-database");

//       console.log("connection sucessful");
//     }
//   );
// });
// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// const ejs = require("ejs");
// const { kStringMaxLength } = require("buffer");

// const table_path = path.join(__dirname, "Admin_panel/table");

// app.set("view engine", "ejs");
// app.set("views", table_path);

// mongoose.connect(
//   "mongodb+srv://login:Tushar%40123%23@cluster0.otykb.mongodb.net/login-database?authSource=admin&replicaSet=atlas-kjissj-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
// );

// const moviesSchema = {
//   firstname: String,
//   lastname: String,
// };

// const Movie = mongoose.model("Movie", moviesSchema);

// app.get("/", (req, res) => {
//   Movie.find({}, function (err, movies) {
//     res.render("index", {
//       moviesList: movies,
//     });
//   });
// });

// app.listen(3000, function () {
//   console.log("server is running");
// });

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
// const moment = require("moment");
// moment.format();

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());

// const url =
//   "mongodb+srv://login:Tushar%40123%23@cluster0.otykb.mongodb.net/login-database?authSource=admin&replicaSet=atlas-kjissj-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";

// const dbName = "login-database";
// const client = new MongoClient(url);

const table_path = path.join(__dirname, "Admin_panel/table");
const style_path = path.join(__dirname, "Admin_panel/login");
// const login_path = path.join(__dirname, "Admin_panel/login");

app.set("view engine", "ejs");
app.use(express.static(style_path));
app.set("views", table_path);
// app.set("views", login_path);

const schema = {
  firstname: String,
  lastname: String,
  email: String,
  contact: Number,
  city: String,
  age: Number,
};

// app.get("/", async (req, res) => {
//   res.render("login");
// });

// app.get("/data", (req, res) => {
//   const db = client.db(dbName);
//   const collection = db.collection("users");

//   collection.find({}).toArray((err, data) => {
//     assert.equal(err, null);
//     res.render("index", { users: data });
//   });
// });

// app.post("/", async (req, res) => {
//   // try {
//   //   const adminId = req.body.email;
//   //   const adminPass = req.body.password;
//   //   res.send("sdvdvdv");

//   //   // if (adminId == username && adminPass == pass) {
//   //   //   console.log("here it is");
//   //   //   // res.status(201).render("index");
//   //   //   app.get("/data", (req, res) => {
//   //   //     const db = client.db(dbName);
//   //   //     const collection = db.collection("users");

//   //   //     collection.find({}).toArray((err, data) => {
//   //   //       assert.equal(err, null);
//   //   //       res.render("index", { users: data });
//   //   //     });
//   //   //   });
//   //   // }
//   // } catch (e) {
//   //   res.status(400).send(e);

//   // const adminId = req.body.email;
//   // const adminPass = req.body.password;
//   // console.log(JSON.parse(req.body));

//   if (!req.user) return res.render("login");

//   if (req.user.email === username && req.user.password === pass) {
//     console.log("in the loop");
//     res.render("index");
//   }
//   console.log("rgrhrh");
// });

// app.post("/", async (req, res) => {
//   // try {
//   //   const email = req.body.email;
//   //   const pass = req.body.password;
//   //   console.log(`${email} and pass is ${pass}`);
//   // } catch (e) {
//   //   res.status(400).send(`invalid...... ${e}`);
//   // }

//   console.log(req.body);
// });

// app.get("/data", (req, res) => {
//   const db = client.db(dbName);
//   const collection = db.collection("users");

//   collection.find({}).toArray((err, data) => {
//     assert.equal(err, null);
//     res.render("index", { users: data });
//   });
// });

// client.connect((err) => {
//   assert.equal(null, err);
//   console.log("Connected successfully to mongo data");

//   app.listen(port, function () {
//     console.log(`Server is running on ${port}`);
//   });
// });

// app.get("/", (req, res) => {
//   Movie.collection("users").find({}, function (err, movies) {
//     res.render("index", {
//       moviesList: movies,
//     });
//   });
// });

app.listen(port, function () {
  console.log(`Server is running on ${port}`);
});

app.use(controller);
