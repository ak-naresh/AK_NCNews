const db = require("../db/connection");

const { fetchArticles } = require("../models/articles.model");

/*
1. Receives the request
2. Calls the model
3. Sends the response wrapping array of articles
*/

exports.getArticles = (req, res) => {
  fetchArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};
