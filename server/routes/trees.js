// Instantiate router - DO NOT MODIFY
const express = require('express');
const router = express.Router();

/**
 * BASIC PHASE 2, Step A - Instantiate SQLite and database
 *   - Database file: "data_source" environment variable
 *   - Database permissions: read/write records in tables
 */
// Your code here
const DATA_SOURCE = process.env.data_source;
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(DATA_SOURCE, sqlite3.OPEN_READWRITE);
let sql;
let params;
const successMsg = {"message": "success"};

/**
 * BASIC PHASE 2, Step B - List of all trees in the database
 *
 * Protocol: GET
 * Path: /
 * Parameters: None
 * Response: JSON array of objects
 *   - Object properties: height-ft, tree, id
 *   - Ordered by the height_ft from tallest to shortest
 */
// Your code here

const getTrees = (req, res, next) => {
  sql = `SELECT id, tree FROM trees ORDER by tree ASC`;
  params = [];
  db.all(sql, params, (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
}

router.get('/', getTrees);

/**
 * BASIC PHASE 3 - Retrieve one tree with the matching id
 *
 * Path: /:id
 * Protocol: GET
 * Parameter: id
 * Response: JSON Object
 *   - Properties: id, tree, location, height_ft, ground_circumference_ft
 */
// Your code here
const getTreeById = (req, res, next) => {
  sql = `SELECT * FROM trees WHERE id=?`;
  params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) return next(err);
    res.json(row);
  });

};

router.get('/:id', getTreeById);

/**
 * INTERMEDIATE PHASE 4 - INSERT tree row into the database
 *
 * Path: /trees
 * Protocol: POST
 * Parameters: None
 * Response: JSON Object
 *   - Property: message
 *   - Value: success
 */
// Your code here
const insertTree = (req, res, next) => {
  sql =
  `INSERT INTO
  trees (tree, location, height_ft, ground_circumference_ft)
  VALUES (?, ?, ?, ?)`
  params = [req.body.name, req.body.location, req.body.height, req.body.size];
  db.run(sql, params, (err, row) => {
    if (err) return next(err);
    res.json(successMsg);
  })
}

router.post('/', insertTree);

/**
 * INTERMEDIATE PHASE 5 - DELETE a tree row from the database
 *
 * Path: /trees/:id
 * Protocol: DELETE
 * Parameter: id
 * Response: JSON Object
 *   - Property: message
 *   - Value: success
 */
// Your code here
const deleteTreeById = (req, res, next) => {
  sql = `DELETE FROM trees WHERE id=?`;
  params = [req.params.id];
  db.run(sql, params, (err, row) => {
    if (err) return next(err);
    res.json(successMsg);
  });
}

router.delete('/:id', deleteTreeById);

/**
 * INTERMEDIATE PHASE 6 - UPDATE a tree row in the database
 *
 * Path: /trees/:id
 * Protocol: PUT
 * Parameter: id
 * Response: JSON Object
 *   - Property: message
 *   - Value: success
 */
// Your code here
const checkTreeId = (req, res, next) => {
  if (req.body.id != req.params.id) {
    let error = new Error("ids do not match");
    error.statusCode = 400;
    next(error);
  }
  next();
}

const updateTreeById = (req, res, next) => {
  sql =
  `UPDATE trees
  SET tree=?, location=?, height_ft=?, ground_circumference_ft=?
  WHERE id=?`;
  params = [req.body.name, req.body.location, req.body.height, req.body.size, req.body.id];
  db.run(sql, params, (err, row) => {
    if (err) return next(err);
    res.json(successMsg);
  });

}
router.put('/:id', checkTreeId, updateTreeById);

// Export class - DO NOT MODIFY
module.exports = router;
