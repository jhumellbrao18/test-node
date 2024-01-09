const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const postRouter = require("./routes/postRoute");
const deleteRouter = require("./routes/deleteRoute");
const updateRouter = require("./routes/updateRoute")
const apiRouter = require("./api/apiResident");
const path = require("path");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydbtest",
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/controller", express.static(path.join(__dirname, "controller")));

app.use("/postIdentity", postRouter);
app.use("/deleteResident", deleteRouter);
app.use("/updateResident", updateRouter);
app.use("/apiResident", apiRouter);

app.use("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(port, () => console.log(`Listen on port ${port}`));
