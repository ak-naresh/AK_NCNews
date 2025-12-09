const db = require("./db/connection");
const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("./controllers/articles.controller");
const { getUsers } = require("./controllers/users.controller");
const {
  handlePathNotFound,
  handleCustomErrors,
  handleBadRequest,
  handleServerErrors,
} = require("./errors");

const app = express();

/*
---
Middleware:
*/
app.use(express.json()); //parses JSON requests to populate request.body

/*
---
Route-handler mappings:
*/
app.get("/api/topics", getTopics); //route for GET requests for topics controller

app.get("/api/articles", getArticles); //route for GET requests for articles controller
app.get("/api/articles/:article_id", getArticleById); //route for GET requests for article by article ID controller
app.get("/api/articles/:article_id/comments", getCommentsByArticleId); //route for GET requests for comments by article ID controller
app.post("/api/articles/:article_id/comments", postCommentByArticleId); //route for POST requests for comments by article ID controller

app.get("/api/users", getUsers); //route for GET requests for users controller

/*
---
Error-handling middleware:
*/
app.use(handlePathNotFound); //Handles unknown endpoints (404)
app.use(handleBadRequest); //Handles PSQL bad request errors (400)
app.use(handleCustomErrors); //Handles custom errors
app.use(handleServerErrors); //Handles all other server errors (500)

module.exports = app;
