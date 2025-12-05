const db = require("./db/connection");
const express = require("express");

const { getTopics } = require("./controllers/topics.controller");
const { getArticles } = require("./controllers/articles.controller");

const app = express();

/*
Middleware functions used:
*/
app.use(express.json()); //parses incoming JSON requests to populates request.body

/*
Route handler functions used:
*/
app.get("/api/topics", getTopics); //handles GET requests to /api/topics
app.get("/api/articles", getArticles); //handles GET requests to /api/articles

/*
Error-handling (middleware functions):
*/
app.use((err, req, res, next) => {
  console.log(err);
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" }); //22P02: non-numeric value is used where a number is expected //400: invalid data input due to wrong type or missing field
  } else res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
