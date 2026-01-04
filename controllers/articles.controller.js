const {
  fetchArticles,
  lookupArticleId,
  fetchCommentsByID,
  insertCommentByArticleId,
  updateArticleVotes,
} = require("../models/articles.model");

function getArticles(request, response, next) {
  return fetchArticles().then((articles) => {
    response.status(200).send({ articles });
  });
}

function getArticleById(request, response, next) {
  const { article_id } = request.params;
  if (isNaN(Number(article_id))) {
    return next({
      status: 400,
      message: "Invalid article_id: must be a number",
    });
  }
  return lookupArticleId(article_id).then((articles) => {
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
    return next({
      status: 400,
      message: "Invalid article_id: must be a number",
    });
  }
  fetchCommentsByID(article_id).then((comments) => {
    if (comments.length === 0) {
      return next({ status: 404, message: "Not Found" });
    } else {
      return response.status(200).send({ comments });
    }
  });
}

function postCommentByArticleId(request, response, next) {
  const { article_id } = request.params;
  const { username, body } = request.body;

  if (isNaN(Number(article_id))) {
    return next({
      status: 400,
      message: "Invalid article_id: must be a number",
    });
  }

  if (!username || !body) {
    return next({ status: 400, message: "Missing field in body" });
  }

  insertCommentByArticleId(article_id, username, body)
    .then((comment) => {
      if (!comment) {
        return next({ status: 404, message: "Article not found" });
      }
      return response.status(201).send({ comment });
    })
    .catch((err) => {
      if (err.status === 404 || err.message === "Article not found") {
        return next({ status: 404, message: "Article not found" });
      }
      next(err);
    });
}

function patchArticleById(request, response, next) {
  const { article_id } = request.params;
  const { inc_votes } = request.body;

  if (isNaN(Number(article_id))) {
    return next({
      status: 400,
      message: "Invalid article_id: must be a number",
    });
  }
  if (isNaN(Number(inc_votes))) {
    return next({
      status: 400,
      message: "Invalid inc_votes: must be a number",
    });
  }
  updateArticleVotes(article_id, inc_votes).then((article) => {
    if (!article) {
      return next({ status: 404, message: "Article not found" });
    } else {
      return response.status(200).send({ article });
    }
  });
}

module.exports = {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
  patchArticleById,
};
