const express = require("express");
require("dotenv").config();
const app = express();
const connection = require("./config-db");

const port = process.env.PORT || 5000;

const usersRouter = require("./routes/users.route");

connection.connect((err) => {
  err
    ? console.log(err)
    : console.log(`Connected to database on thread ${connection.threadId}`);
});

app.use(express.json());
app.use("/users", usersRouter);

app.listen(port, (err) => {
  err ? console.log(err) : console.log(`App connected at port ${port}`);
});
