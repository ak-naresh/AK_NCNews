const db = require("../db/connection");

/*
- fetchArticles returns articles table with all properties and, includes COUNT comments column  for each article using LEFT JOIN
- Articles are grouped by article_id
- Results ordered by creation date in descending
- Body property is excluded as per requirements
- Function returns promise that resolves to array of article objects, including a comment_count property
*/

const fetchArticles = () => {
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
      if (result.rows.length === 0) {
        const err = { status: 404, msg: "No articles found" };
        throw err;
      } else {
        return result.rows.map((article) => ({
          ...article,
          comment_count: parseInt(article.comment_count, 10),
        }));
      }
    });
};

/*
- fetchArticleById retrieves a single article from database by article_id
- It executes SQL query that selects all columns from the articles table where article_id matches provided id
- Used parametric query to prevent SQL injection
- Function returns a promise that resolves to an array containing the matching article object (empty array if not found)
*/

const fetchArticleById = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then(({ rows }) => rows);
};

/*
- fetchCommentsByDate retrieves all comments for a specific article, identified by article_id.
- It executes SQL query that selects all columns from the articles table where article_id matches provided id
- Used parametric query to prevent SQL injection
- Function returns a promise that resolves to an array containing the matching article object (empty array if not found)
*/
const fetchCommentsByDate = (id) => {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
      [id]
    )
    .then(({ rows }) => rows);
};

module.exports = {
  fetchArticles,
  fetchArticleById,
  fetchCommentsByDate,
};
