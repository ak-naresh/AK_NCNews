const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app");

beforeAll(() => seed(testData));
afterAll(() => db.end());

//GET /api/articles
describe("GET /api/articles", () => {
  //1
  test("responds has 'articles' property", () => {
    return request(app)
      .get("/api/articles")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("articles");
      });
  });

  //2
  test("'articles' is an array", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.articles)).toBe(true);
      });
  });

  /*
  //3
  test("each article has required properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        res.body.articles.forEach((article) => {
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("article_img_url");
          expect(article).toHaveProperty("comment_count");
        });
      });
  });
  */

  /*
  //4
  test("articles are sorted by date descending", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        const articles = res.body.articles;
      });
  });
  */

  //5
  test("no article object has a 'body' property", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        res.body.articles.forEach((article) => {
          expect(article).not.toHaveProperty("body");
        });
      });
  });

  /*
  //6
  test("comment_count matches number of comments in database for an article", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        const articles = res.body.articles;
        const checks = articles.map((article) => {
          const { article_id, comment_count } = article;
          return db
            .query(
              "SELECT COUNT(*)::int AS count FROM comments WHERE article_id = $1",
              [article_id]
            )
            .then((dbRes) => {
              expect(comment_count).toBe(dbRes.rows[0].count);
            });
        });
        return Promise.all(checks);
      });
  });
  */
});
