const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
  patchArticleById,
} = require("./controllers/articles.controller");
const { getUsers } = require("./controllers/users.controller");
const { deleteCommentById } = require("./controllers/articles.controller");
const {
  handlePathNotFound,
  handleCustomErrors,
  handleBadRequest,
  handleServerErrors,
} = require("./errors");

const app = express();
const cors = require("cors");

const path = require("path");

//Enable CORS:
app.use(cors());

//Middleware:
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//Route-handler mappings:
app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", postCommentByArticleId);
app.delete("/api/comments/:comment_id", deleteCommentById);
app.patch("/api/articles/:article_id", patchArticleById);
app.get("/api/users", getUsers);

//Error-handling middleware:
app.use(handleBadRequest);
app.use(handleCustomErrors);
app.use(handleServerErrors);
app.use("/*invalidpath", handlePathNotFound);

module.exports = app;
