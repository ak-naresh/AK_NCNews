const db = require("../db/connection");
const articlesModel = require("../models/articles.model");

/*
1. Receives request
2. Calls model
3. Sends response wrapping array of articles
*/

function getArticles(request, response, next) {
  return articlesModel.fetchArticles().then((articles) => {
    response.status(200).send({ articles });
  });
}

function getArticleById(request, response, next) {
  const { article_id } = request.params;
  if (isNaN(Number(article_id))) {
    //isNaN checks if article_id is not a number
    return next({ code: "22P02" });
  }
  return articlesModel.lookupArticleId(article_id).then((articles) => {
    if (articles.length === 0) {
  return next({ status: 404, message: "Not Found" });
    }
    response.status(200).send({ article: articles[0] });
  });
}

function getCommentsByArticleId(request, response, next) {
  const { article_id } = request.params;
  if (isNaN(Number(article_id))) {
    return next({ code: "22P02" });
  }
  return articlesModel.fetchCommentsByDate(article_id).then((comments) => {
    if (comments.length <= 0) {
  return next({ status: 404, message: "Not Found" });
    }
    response.status(200).send({ comments });
  });
}

module.exports = {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
};
