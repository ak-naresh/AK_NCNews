const db = require("./db/connection");
const express = require("express");

const { getTopics } = require("./controllers/topics.controller");
const {
  getArticles,
  getArticleById,
} = require("./controllers/articles.controller");
const { getUsers } = require("./controllers/users.controller");

const app = express();

/*
Middleware functions:
*/
app.use(express.json()); //parses incoming JSON requests to populate request.body

/*
Route-handler functions:
*/
app.get("/api/topics", getTopics); //route for GET requests for /api/topics to controller
app.get("/api/articles", getArticles); //route for GET requests for /api/articles to controller
app.get("/api/articles/:article_id", getArticleById); //route for GET requests for /api/articles/:article_id to controller
app.get("/api/users", getUsers); //route for GET requests for /api/users to controller

/*
For requests to endpoints that do not exist:
*/
app.use((request, response, next) => {
  next({ status: 404 }); //detects requests to unknown endpoints and instead of responding calls next with 404 && passes the 404s to the below error-handling middleware which catches it and sends the appropriate 404 response.
});

/*
Error-handling middleware functions:
*/
app.use((error, request, response, next) => {
  //console.log(error);
  if (error.status === 404) {
    response.status(404).send({ msg: "Not Found" }); //404: endpoint does not exist
  } else if (error.code === "22P02") {
    response.status(400).send({ msg: "Bad Request" }); //22P02: non-numeric value is used where number is expected
  } else {
    response.status(500).send({ msg: "Internal Server Error" }); //500: server error
  }
});

module.exports = app;
