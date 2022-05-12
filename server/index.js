const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const mysql = require("mysql");

require("dotenv").config();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const database = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

router.get("/users", (req, res) => {
  const { status } = req.query;
  const sqlQuery = `SELECT * FROM users WHERE status = '${status}'`;
  database.query(sqlQuery, (err, users) => {
    if (err) {
      console.log(err);
      throw err;
    }

    res.json(users);
  });
});

router.post("/user", (req, res) => {
  const data = req.body;
  if (data.fname && data.lname && data.email) {
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
