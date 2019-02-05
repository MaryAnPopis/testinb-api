const express = require("express");
const router = express.Router();
const db = require("../conn");

/**
 * Register test suite
 */
router.post("/", (req, res) => {
  const testSuite = {
    title: req.body.title,
    creation_date: req.body.creationDate,
    idGroup: req.body.idGroup,
    idProject: req.body.idProject
  };

  const sql = "INSERT INTO test_suites SET ?";
  db.query(sql, testSuite, (err, results) => {
    if (err) throw err;
    res.status(200).json({ insertId: results.insertId });
  });
});

/**
 * Get all test suite by group
 * @param id test suite id
 */
router.get("/group/:idGroup", (req, res) => {
  let sql = `SELECT * from test_suites where idGroup = ${req.params.idGroup}`;
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
 * Get one test suite by id
 * @param id test suite id
 */
router.get("/:id", (req, res) => {
  let sql = `SELECT * from test_suites where id = ${req.params.id}`;
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
 * Update a test suite
 * @param id test suite id to update
 */
router.patch("/:id", (req, res) => {
  const updateOps = req.body;

  let sql = `UPDATE test_suites SET ? WHERE id = ${req.params.id}`;
  db.query(sql, updateOps, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
