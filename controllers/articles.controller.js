const db = require("../db/connection");
const { fetchArticles } = require("../models/articles.model");
const { fetchArticleById } = require("../models/articles.model");

/*
1. Receives the request
2. Calls the model
3. Sends the response wrapping array of articles
*/

function getArticles(request, response, next) {
  if (request.query.fail === "true") {
    return next(new Error());
  }
  fetchArticles()
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((error) => {
      next(error);
    });
}

function getArticleById(request, response, next) {
  const { article_id } = request.params;

  if (isNaN(Number(article_id))) {
    const err = new Error("Bad Request");
    err.code = "22P02";
    return next(err);
  }
  fetchArticleById(article_id)
    .then((articles) => {
      if (articles.length === 0) {
        const err = new Error("Not Found");
        err.status = 404;
        return next(err);
      }
      response.status(200).send({ article: articles[0] });
    })
    .catch(next);
}

module.exports = { getArticles, getArticleById };
