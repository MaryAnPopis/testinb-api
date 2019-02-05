const express = require("express");
const router = express.Router();
const db = require("../conn");

/**
 * Get users by Group
 */
router.get("/group/:groupId", (req, res) => {
  let sql = `SELECT * from users where idGroup = ${req.params.groupId}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.err(`GET/:id error ${err}`);
      throw err;
    } else {
      res.send(result);
    }
  });
});

/**
 * Register user
 */
router.post("/", (req, res) => {
  const user = {
    name: req.body.name,
    password: req.body.password,
    isPasswordChange: req.body.isPasswordChange,
    idGroup: req.body.idGroup,
    email: req.body.email
  };

  const sql = "INSERT INTO users SET ?";
  db.query(sql, user, (err, results) => {
    if (err) throw err;
    res.status(200).json({ insertId: results.insertId });
  });
});

/**
 * Get one user by id
 * @param id user id
 */
router.get("/:id", (req, res) => {
  let sql = `SELECT * from users where id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.err(`GET/:id error ${err}`);
      throw err;
    } else {
      res.send(result);
    }
  });
});

/**
 * Update a user
 * @param id user id to update
 */
router.patch("/:id", (req, res) => {
  const updateOps = req.body;

  let sql = `UPDATE users SET ? WHERE id = ${req.params.id}`;
  db.query(sql, updateOps, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
