const db = require("../db/connection");
const { fetchArticles } = require("../models/articles.model");
const { lookupArticleId } = require("../models/articles.model");

/*
1. Receives request
2. Calls model
3. Sends response wrapping array of articles
*/

function getArticles(request, response, next) {
  if (request.query.fail === "true") {
    return next(new Error());
  }
  fetchArticles()
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
}

function getArticleById(request, response, next) {
  const { article_id } = request.params;

  if (isNaN(Number(article_id))) {
    const error = new Error("Bad Request");
    error.code = "22P02"; //check if article_id is not a number
    return next(error);
  }
  lookupArticleId(article_id)
    .then((articles) => {
      if (articles.length === 0) {
        const error = new Error("Not Found");
        error.status = 404;
        return next(error);
      }
      response.status(200).send({ article: articles[0] });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getArticles, getArticleById };
