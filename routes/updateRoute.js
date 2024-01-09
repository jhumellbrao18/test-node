const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydbtest",
});

router.put("/:id", (req, res) => {
  const residentId = req.params.id;
  const { first_name, last_name, email } = req.body;

  const query_update = `UPDATE resident_info SET first_name=?, last_name=?, email=? WHERE id=?`;
  conn.query(
    query_update,
    [first_name, last_name, email, residentId],
    (err, result) => {
      if (err) {
        console.error("Error updating resident:", err);
        res.status(500).send("Error updating resident");
      } else {
        console.log("Updated!");
        res.status(200).send("Resident updated successfully");
      }
    }
  );
  
});

module.exports = router;
