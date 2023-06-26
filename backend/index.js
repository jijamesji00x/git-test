const { log } = require("console");
const express = require("express");
const http = require("http");

const app = express();
const path = require("path");
const router = express.Router();

require("dotenv").config();

const { Client } = require("pg");
const client = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

client
  .connect()
  .then(() => {
    console.log("Connected to Postgres!");
    // Perform database operations
    // ...
  })
  .catch((err) => {
    console.error("Error connecting to Postgres:", err);
  });

client.query(`Select * from country_and_capitals`, (err, res) => {
  if (!err) {
    console.log(res.rows);
  } else {
    console.log(err.message);
  }
  client.end;
});

/*router.get("/", function (req, res, next) {
  client.query(`Select * from country_and_capitals`, (err, res) => {
    if (!err) {
      res.send(result.rows);
      console.log(res.rows);
    } else {
      console.log(err.message);
    }
    client.end;
  });
});*/
/*const data = [
  {
    country: "Thailand",
    capital: "Bangkok",
  },
  {
    country: "China",
    capital: "Beijing",
  },
  {
    country: "Japan",
    capital: "Tokyo",
  },
  {
    country: "France",
    capital: "Paris",
  },
];*/

/*router.get("/data", function (req, res, next) {
  res.send(data);
});*/

router.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "../frontend", "/index.html"));
});

//console.log(process.env);
router.get("/data", function (req, res, next) {
  console.log("test");
  client.query(`Select * from country_and_capitals`, (err, result) => {
    if (!err) {
      res.send(result.rows);
      console.log(result.rows);
      console.log("api/data success");
    } else {
      console.log(err.message);
    }

    client.end;
  });
});
/*client.query(`Select * from country_and_capitals`, (err, res) => {
  if (!err) {
    //res.send(result.rows);
    console.log(res.rows);
    //res.sendFile(path.join(__dirname, "../frontend", "/index.html"));
  } else {
    console.log(err.message);
  }
  client.end;
});*/
app.use("/", router);
app.listen(3001);
//console.log("server running in port 3001");
