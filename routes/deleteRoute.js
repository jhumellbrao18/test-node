const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydbtest",
});

router.delete("/:id", (req, res) => {
  const residentId = req.params.id;

  const query_insert = `DELETE FROM resident_info WHERE id =?`;
  conn.query(query_insert, [residentId], (err, result) => {
    if (err) throw err;
    console.log("deleted!");
  });

  res.redirect("/");
});

module.exports = router;
