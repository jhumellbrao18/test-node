const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydbtest",
});

router.post("/", (req, res) => {
  const { first_name, last_name, email } = req.body;

  const query_insert = `INSERT INTO resident_info (first_name, last_name, email) VALUES (?,?,?)`;
  conn.query(query_insert, [first_name, last_name, email], (err, result) => {
    if (err) throw err;
    console.log("inserted!");
  });

  res.redirect("/");
});

module.exports = router;
