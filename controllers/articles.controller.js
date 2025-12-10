const articlesModel = require("../models/articles.model");

function getArticles(request, response, next) {
  return articlesModel
    .fetchArticles()
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch(next);
}

function getArticleById(request, response, next) {
  const { article_id } = request.params;
  if (isNaN(Number(article_id))) {
    return next({ code: "22P02" });
  }
  return articlesModel
    .lookupArticleId(article_id)
    .then((articles) => {
      if (articles.length === 0) {
        return next({ status: 404, message: "Not Found" });
      } else {
        return response.status(200).send({ article: articles[0] });
      }
    })
    .catch(next);
}

function getCommentsByArticleId(request, response, next) {
  const { article_id } = request.params;
  if (isNaN(Number(article_id))) {
    return next({ code: "22P02" });
  }
  articlesModel
    .fetchCommentsByID(article_id)
    .then((comments) => {
      if (comments.length === 0) {
        return next({ status: 404, message: "Not Found" });
      } else {
        return response.status(200).send({ comments });
      }
    })
    .catch(next);
}

function postCommentByArticleId(request, response, next) {
  const { article_id } = request.params;
  const { username, body } = request.body;

  if (isNaN(Number(article_id))) {
    return next({ code: "22P02" });
  }

  if (!username || !body) {
    return response.status(400).send({ message: "Missing field in body" });
  }

  articlesModel
    .insertCommentByArticleId(article_id, username, body)
    .then((comment) => {
      return response.status(201).send({ comment });
    })
    .catch(next);
}

function patchArticleById(request, response, next) {
  const { article_id } = request.params;
  const { inc_votes } = request.body;

  if (isNaN(Number(article_id))) {
    return next({ code: "22P02" });
  }
  if (isNaN(Number(inc_votes))) {
    return response.status(400).send({ message: "Bad Request" });
  }
  articlesModel
    .updateArticleVotes(article_id, inc_votes)
    .then((article) => {
      if (!article) {
        return response.status(404).send({ message: "Article not found" });
      } else {
        return response.status(200).send({ article });
      }
    })
    .catch(next);
}

module.exports = {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
  patchArticleById,
};
