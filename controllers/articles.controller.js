const db = require("../db/connection");
const { fetchArticles } = require("../models/articles.model");
const { lookupArticleId } = require("../models/articles.model");

/*
1. Receives request
2. Calls model
3. Sends response wrapping array of articles
*/

function getArticles(request, response, next) {
  return fetchArticles().then((articles) => {
    response.status(200).send({ articles });
  });
}

function getArticleById(request, response, next) {
  const { article_id } = request.params;
  if (isNaN(Number(article_id))) {
    //isNaN checks if article_id is not a number
    const error = new Error("Bad Request");
    error.code = "22P02";
    throw error;
  }
  return lookupArticleId(article_id).then((articles) => {
    if (articles.length === 0) {
      const error = new Error("Not Found");
      error.status = 404;
      throw error;
    }
    response.status(200).send({ article: articles[0] });
  });
}

const { fetchCommentsByDate } = require("../models/articles.model");

function getCommentsByArticleId(request, response, next) {
  const { article_id } = request.params;
  if (isNaN(Number(article_id))) {
    const error = new Error("Bad Request");
    error.code = "22P02";
    throw error;
  }
  return fetchCommentsByDate(article_id).then((comments) => {
    if (comments.length <= 0) {
      const error = new Error("Not Found");
      error.status = 404;
      throw error;
    }
    response.status(200).send({ comments });
  });
}

module.exports = { getArticles, getArticleById, getCommentsByArticleId };
