const db = require("../db/connection");
const { fetchArticles } = require("../models/articles.model");

/*
1. Receives the request
2. Calls the model
3. Sends the response wrapping array of articles
*/

function getArticles(request, response, next) {
  fetchArticles()
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getArticles };
