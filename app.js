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
app.get("/api/topics", getTopics); //responds with a list of topics

app.get("/api/articles", getArticles); //responds with a list of articles
app.get("/api/articles/:article_id", getArticleById); //responds with an article by article ID
app.get("/api/articles/:article_id/comments", getCommentsByArticleId); //responds with a list of comments by article ID
app.post("/api/articles/:article_id/comments", postCommentByArticleId); //add a comment to an article by article ID
//app.patch("/api/articles/:article_id", patchArticleById); //updates an article by article ID

app.get("/api/users", getUsers); //responds with a list of users

/*
---
Error-handling middleware:  (do not reorder- 404 must be last as it catches unmatched routes)
*/
app.use(handleBadRequest); //Handles PSQL bad request errors (400)
app.use(handleCustomErrors); //Handles custom errors
app.use(handleServerErrors); //Handles all other server errors (500)
app.use("/*invalidpath", handlePathNotFound); //Handles unknown endpoints (404)

module.exports = app;
