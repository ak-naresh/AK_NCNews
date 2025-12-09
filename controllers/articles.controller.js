const articlesModel = require("../models/articles.model");

function getArticles(request, response, next) {
  return articlesModel.fetchArticles().then((articles) => {
    response.status(200).send({ articles });
  });
}

function getArticleById(request, response, next) {
  const { article_id } = request.params;
  if (isNaN(Number(article_id))) {
    return next({ code: "22P02" });
  }
  return articlesModel.lookupArticleId(article_id).then((articles) => {
    if (articles.length === 0) {
      return next({ status: 404, message: "Not Found" });
    } else {
      return response.status(200).send({ article: articles[0] });
    }
  });
}

function getCommentsByArticleId(request, response, next) {
  const { article_id } = request.params;
  if (isNaN(Number(article_id))) {
    return next({ code: "22P02" });
  }
  articlesModel
    .fetchCommentsByDate(article_id)
    .then((comments) => {
      if (comments.length === 0) {
        return next({ status: 404, message: "Not Found" });
      } else {
      }
      return response.status(200).send({ comments });
    })
    .catch(next);
}

function postCommentByArticleId(request, response, next) {
  const { article_id } = request.params;
  const { username, body } = request.body;

  if (!username || !body) {
    return response
      .status(400)
      .send({ message: "Missing field in request body" });
  }

  articlesModel
    .insertCommentByArticleId(article_id, username, body)
    .then((comment) => {
      response.status(200).send({ comment });
    })
    .catch(next);
}

module.exports = {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
};
