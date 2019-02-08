const express = require("express");
const router = express.Router();
const db = require("../conn");

/**
 * Register test run
 */
router.post("/", (req, res) => {
  const testRun = {
    creation_date: req.body.creation_date,
    ownerRun: req.body.ownerRun,
    idGroup: req.body.idGroup,
    name: req.body.name,
    idTestSuite: req.body.idTestSuite,
    isActive: req.body.isActive
  };

  const sql = "INSERT INTO test_run SET ?";
  db.query(sql, testRun, (err, results) => {
    if (err) throw err;
    res.status(200).json({ insertId: results.insertId });
  });
});

/**
 * Get all test runs by group
 * @param id group id
 */
router.get("/group/:idGroup", (req, res) => {
  let sql = `SELECT * from test_run where idGroup = ${req.params.idGroup}`;
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
 * Get test run by id
 * @param id test run id
 */
router.get("/:id", (req, res) => {
  let sql = `SELECT * from test_run where id = ${req.params.id}`;
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
 * Register test run
 */
router.post("/run", (req, res) => {
  const run = {
    idTestSuite: req.body.idTestSuite,
    idTestCase: req.body.idTestCase,
    idTestRun: req.body.idTestRun,
    result: req.body.result
  };

  const sql = "INSERT INTO test_run_x_test_case SET ?";
  db.query(sql, run, (err, results) => {
    if (err) throw err;
    res.status(200).json({ insertId: results.insertId });
  });
});

module.exports = router;
