const router = require("express").Router();
const connection = require("../config-db");

const db = connection.promise();

// POST /users
router.post("/", (req, res) => {
  const newUser = req.body;

  db.query("INSERT INTO users SET ?", [newUser])
    .then(([result]) => {
      const newUserId = result.insertId;

      return db.query("SELECT * FROM users WHERE id = ?", [newUserId]);
    })
    .then(([newUser]) => res.status(200).json(newUser[0]))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
