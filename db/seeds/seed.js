const db = require("../connection");
const format = require("pg-format");

const seed = ({ topicData, userData, articleData, commentData }) => {
  //drop table if exist in reverse order & create tables in order of dependencies
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

      // seeding for topic
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
  );
};

module.exports = seed;
