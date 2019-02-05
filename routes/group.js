const express = require("express");
const router = express.Router();
const db = require("../conn");

/**
 * Register group
 */
router.post("/", (req, res) => {
  const group = {
    name: req.body.name,
    logo: req.body.logo,
    idOwner: req.body.idOwner,
    isActive: req.body.isActive
  };

  const sql = "INSERT INTO groups SET ?";
  db.query(sql, group, (err, results) => {
    if (err) throw err;
    res.status(200).json({ insertId: results.insertId });
  });
});

/**
 * Update a group
 * @param id user id to update
 */
router.patch("/:id", (req, res) => {
  const updateOps = req.body;

  let sql = `UPDATE groups SET ? WHERE id = ${req.params.id}`;
  db.query(sql, updateOps, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

/**
 * Get a group by id
 * @param id user id
 */
router.get("/:id", (req, res) => {
  let sql = `SELECT * from groups where id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.err(`GET/:id error ${err}`);
      throw err;
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
