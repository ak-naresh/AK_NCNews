const db = require("../connection");
const format = require("pg-format");
const lookupArticleId = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  //drop table if exists (must be in reverse order) & create tables in order of dependencies
  return (
    db
      .query(
        `
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS topics;

  
        CREATE TABLE topics (
                slug VARCHAR PRIMARY KEY,
                description VARCHAR,
                img_url VARCHAR(1000) NOT NULL
        );
        
        CREATE TABLE users (
                username VARCHAR(50) PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                avatar_url VARCHAR(1000) NOT NULL
        );

        CREATE TABLE articles (
                article_id SERIAL PRIMARY KEY,
                title VARCHAR NOT NULL,
                topic VARCHAR REFERENCES topics(slug),
                author VARCHAR REFERENCES users(username),
                body TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                votes INT DEFAULT (0),
                article_img_url VARCHAR(1000)
        );

        CREATE TABLE comments (
                comment_id SERIAL PRIMARY KEY,
                article_id INT REFERENCES articles(article_id),
                body TEXT,
                votes INT DEFAULT (0),
                author VARCHAR REFERENCES users(username),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
`
      )

      //seedings
      .then(() => {
        const topicRows = topicData.map(({ slug, description, img_url }) => [
          slug,
          description,
          img_url,
        ]);
        const insertTopicsQuery = format(
          "INSERT INTO topics (slug, description, img_url) VALUES %L RETURNING *;",
          topicRows
        );
        return db.query(insertTopicsQuery);
      })

      .then(() => {
        const userRows = userData.map(({ username, name, avatar_url }) => [
          username,
          name,
          avatar_url,
        ]);
        const insertUsersQuery = format(
          "INSERT INTO users (username, name, avatar_url) VALUES %L RETURNING *;",
          userRows
        );
        return db.query(insertUsersQuery);
      })

      .then(() => {
        const articleRows = articleData.map(
          ({
            title,
            topic,
            author,
            body,
            created_at,
            votes,
            article_img_url,
          }) => [title, topic, author, body, created_at, votes, article_img_url]
        );
        const insertArticlesQuery = format(
          "INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *;",
          articleRows
        );
        return db.query(insertArticlesQuery);
      })

      //seeding for comments using mapped article_ids
      .then(() => {
        return db
          .query("SELECT * FROM articles;") //need inserted articles to retrieve autogen articles_id

          .then((articleInsertResult) => {
            //handles result of insertArticlesQuery which contains rows (rows = array of all article records)
            const insertedArticles = articleInsertResult.rows;

            //inserteDArticles stores array from rows for mapping

            //mappedComment from utils, returns anew array of comments instead of mutating original and assiginss to correct aritcle_id instead of article_title
            const mappedComments = lookupArticleId(
              commentData,
              insertedArticles
            );

            const commentRows = mappedComments.map(
              ({ article_id, body, votes, author, created_at }) => [
                article_id,
                body,
                votes,
                author,
                created_at,
              ]
            );
            const insertCommentsQuery = format(
              "INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L RETURNING *;",
              commentRows
            );
            return db.query(insertCommentsQuery);
          });
      })
  );
};

/*
to check again via terminal, in psql, connect to nc_news_test , then to check type: 

SELECT c.comment_id, c.article_id, a.title
FROM comments c
JOIN articles a ON c.article_id = a.article_id;

*/

module.exports = seed;
