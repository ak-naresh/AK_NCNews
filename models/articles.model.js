const db = require("../db/connection");

function fetchArticles() {
  return db
    .query(
      `SELECT author, title, article_id, topic, created_at, votes, article_img_url FROM articles;`
    )
    .then((result) => {
      return result.rows.map((article) => {
        delete article.body;
        return article;
      });
    });
}

module.exports = { fetchArticles };
