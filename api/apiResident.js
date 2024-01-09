const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydbtest",
});

router.get("/", (req, res) => {
  res.set("Content-Type", "application/javascript");
  const query_api = `SELECT resident_info.id, resident_info.first_name, resident_info.last_name, resident_info.email FROM resident_info`;
  conn.query(query_api, (err, results) => {
    if (err) throw err;
    console.log("inserted!");
    const data = results.map((request) => ({
      id: request.id,
      first_name: request.first_name,
      last_name: request.last_name,
      email: request.email,
    }));

    res.json(data);
  });
});

module.exports = router;
