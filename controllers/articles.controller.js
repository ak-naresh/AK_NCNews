const db = require("../db/connection");

const { fetchArticles } = require("../models/articles.model");

/*
1. Receives the request
2. Calls the model
3. Sends the response wrapping array of articles
*/

exports.getArticles = (require, response) => {
  fetchArticles().then((articles) => {
    response.status(200).send({ articles });
  });
};
