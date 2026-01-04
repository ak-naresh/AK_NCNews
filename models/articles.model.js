const db = require("../db/connection");

//fetchArticles
function fetchArticles() {
  return db
    .query(
      `
    SELECT
      articles.author,
      articles.title,
      articles.article_id,
      articles.topic,
      articles.created_at,
      articles.votes,                
      articles.article_img_url,
    COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;
  `
    )
    .then((result) => {
      return result.rows.map((article) => ({
        ...article,
        comment_count: parseInt(article.comment_count, 10),
      }));
    });
}

//lookupArticleId
function lookupArticleId(article_id) {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      return rows;
    });
}

//fetchCommentsByID
function fetchCommentsByID(article_id) {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
}

//insertCommentByArticleId
function insertCommentByArticleId(article_id, username, body) {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then((articleResult) => {
      if (articleResult.rows.length === 0) {
        return Promise.reject({ status: 404, message: "Article not found" });
      }
      return db
        .query(
          `INSERT INTO comments (article_id, body, author) VALUES ($1, $2, $3) RETURNING *;`,
          [article_id, body, username]
        )
        .then((commentResult) => commentResult.rows[0]);
    });
}

//updateArticleVotes
function updateArticleVotes(article_id, inc_votes) {
  return db
    .query(
      `UPDATE articles
       SET votes = votes + $1
       WHERE article_id = $2
       RETURNING *;`,
      [inc_votes, article_id]
    )
    .then((result) => {
      return result.rows[0];
    });
}

module.exports = {
  fetchArticles,
  lookupArticleId,
  fetchCommentsByID,
  insertCommentByArticleId,
  updateArticleVotes,
};
