const express = require("express");
const router = express.Router();
const db = require("../conn");

/**
 * Register test case
 */
router.post("/", (req, res) => {
  const testCase = {
    title: req.body.title,
    creation_date: req.body.creation_date,
    description: req.body.description,
    expected_result: req.body.expected_result,
    attachment: req.body.attachment,
    steps: req.body.steps,
    isActive: req.body.isActive
  };

  const sql = "INSERT INTO test_cases SET ?";
  db.query(sql, testCase, (err, results) => {
    if (err) throw err;
    res.status(200).json({ insertId: results.insertId });
  });
});

/**
 * Register test case steps
 */
router.post("/step", (req, res) => {
  const steps = {
    definition: req.body.definition,
    idTestCase: req.body.idTestCase,
    position: req.body.position
  };

  const sql = "INSERT INTO steps SET ?";
  db.query(sql, steps, (err, results) => {
    if (err) throw err;
    res.status(200).json({ insertId: results.insertId });
  });
});

/**
 * Resgister test case into test suite
 */
router.post("/testsuite", (req, res) => {
  const testRelation = {
    idTestSuite: req.body.idTestSuite,
    idTestCase: req.body.idTestCase
  };

  const sql = "INSERT INTO test_cases_x_test_suite SET ?";
  db.query(sql, testRelation, (err, results) => {
    if (err) throw err;
    res.status(200).json({ insertId: results.insertId });
  });
});

/**
 * Get all test cases by test suite
 * @param id test suite id
 */
router.get("/testsuite/:idTestSuite", (req, res) => {
  const sql = `select tc.id, tc.creation_date, tc.title, tc.description, tc.expected_result, tc.attachment, tc.isActive, tc.steps
  from test_cases as tc
  inner join test_cases_x_test_suite as tstc
  ON tc.id = tstc.idTestCase
  inner join test_suites as ts
  ON ts.id = tstc.idTestSuite
  WHERE ts.id = ${req.params.idTestSuite}`;
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
 * Get one test case by id
 * @param id test case id
 */
router.get("/:id", (req, res) => {
  let sql = `SELECT * from test_cases where id = ${req.params.id}`;
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
 * Get all steps by test case
 * @param id test cases id
 */
router.get("/step/:idTestCase", (req, res) => {
  const sql = `SELECT * from steps where idTestCase = ${req.params.idTestCase}`;
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
 * Update a steps
 * @param id steps id to update
 */
router.patch("/step/:id", (req, res) => {
  const updateOps = req.body;

  const sql = `UPDATE steps SET ? WHERE id = ${req.params.id}`;
  db.query(sql, updateOps, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

/**
 * Update a test case
 * @param id project id to update
 */
router.patch("/:id", (req, res) => {
  const updateOps = req.body;

  const sql = `UPDATE test_cases SET ? WHERE id = ${req.params.id}`;
  db.query(sql, updateOps, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
