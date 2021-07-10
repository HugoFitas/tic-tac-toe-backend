const router = require("express").Router();
const connection = require("../config-db");

const db = connection.promise();

// GET /users
router.get("/", (req, res) => {
  db.query("SELECT * FROM users ORDER BY high_score DESC")
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

// PUT /users/:id
router.put("/:id", (req, res) => {
  const userId = req.params.id;
  const userInfo = req.body;

  let userToBeUpdated = null;

  db.query("SELECT * FROM users WHERE id = ?", [userId])
    .then(([result]) => {
      userToBeUpdated = result[0];
      if (!userToBeUpdated) return Promise.reject("RECORD_NOT_FOUND");

      return db.query("UPDATE users SET ? WHERE id = ?", [userInfo, userId]);
    })
    .then(() => {
      const updatedUser = { ...userToBeUpdated, ...userInfo };

      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      if (err === "RECORD_NOT_FOUND")
        res
          .status(404)
          .json({ errorMessage: `User with id ${userId} not found` });
      else res.status(500).json(err);
    });
});

module.exports = router;
