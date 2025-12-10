const db = require("../db/connection");

/*
- fetchArticles returns articles table with all properties and, includes COUNT comments column  for each article using LEFT JOIN
- Articles are grouped by article_id and ordered by creation date in descending order
- Returns promise that resolves to array of article objects, including comment_count property, and Body property is excluded as per requirements
*/

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
      //checks whether database query returns articles- if none exists, triggers error indicating no articles exist, which is then handled by the error middleware.
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, message: "Path Not Found" });
      } else {
        return result.rows.map((article) => ({
          ...article,
          comment_count: parseInt(article.comment_count, 10),
        }));
      }
    });
}

/*
- lookupArticleId retrieves a single article from database by article_id
- It executes SQL query that selects all columns from the articles table where article_id matches provided id
- Used parametric query to prevent SQL injection
- Function returns a promise that resolves to an array containing the matching article object (empty array if not found)
*/

function lookupArticleId(article_id) {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      return rows;
    });
}

/*
- fetchCommentsByID retrieves all comments for a specific article, identified by article_id.
- It executes SQL query that selects all columns from the articles table where article_id matches provided id
- Used parametric query to prevent SQL injection
- Function returns a promise that resolves to an array containing the matching article object (empty array if not found)
*/

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

/*
 - insertCommentByArticleId adds a new comment to the specific article_id.
 - First checks if the article ID exists, if not it rejects the promise with a 404.
 - If the article exists, it inserts the new comment into the comments table using parametric query to avoid SQL injection.
 - Returns promise that resolves to newly inserted comment. Any user errors are handled by the database.
*/
function insertCommentByArticleId(article_id, username, body) {
  return db //cjecks if article exists
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then((articleResult) => {
      if (articleResult.rows.length === 0) {
        return Promise.reject({ status: 404, message: "Article not found" });
      }
      return db //Adds comment and returns is sent in response
        .query(
          `INSERT INTO comments (article_id, body, author) VALUES ($1, $2, $3) RETURNING *;`,
          [article_id, body, username]
        )
        .then((commentResult) => commentResult.rows[0]);
    });
}

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
