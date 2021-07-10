const router = require("express").Router();
const connection = require("../config-db");

const db = connection.promise();

// GET /users
router.get("/", (req, res) => {
  db.query("SELECT * FROM users")
    .then(([allUsers]) => res.status(200).json(allUsers))
    .catch((err) => res.status(500).json(err));
});

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
