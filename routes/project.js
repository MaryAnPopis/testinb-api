const express = require("express");
const router = express.Router();
const db = require("../conn");

/**
 * Register project
 */
router.post("/", (req, res) => {
  const project = {
    name: req.body.name,
    creation_date: req.body.creation_date,
    idGroup: req.body.idGroup,
    isActive: req.body.isActive
  };

  const sql = "INSERT INTO projects SET ?";
  db.query(sql, project, (err, results) => {
    if (err) throw err;
    res.status(200).json({ insertId: results.insertId });
  });
});

/**
 * Get all project by group
 * @param id project id
 */
router.get("/group/:idGroup", (req, res) => {
  let sql = `SELECT * from projects where idGroup = ${req.params.idGroup}`;
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
 * Get one project by id
 * @param id project id
 */
router.get("/:id", (req, res) => {
  let sql = `SELECT * from projects where id = ${req.params.id}`;
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
 * Update a project
 * @param id project id to update
 */
router.patch("/:id", (req, res) => {
  const updateOps = req.body;

  let sql = `UPDATE projects SET ? WHERE id = ${req.params.id}`;
  db.query(sql, updateOps, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
