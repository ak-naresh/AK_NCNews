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
      .then((response) => {
        expect(response.body).toHaveProperty("articles");
      });
  });

  //2
  test("'articles' is an array", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.articles)).toBe(true);
      });
  });

  /*
  //3
  test("each article has required properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        response.body.articles.forEach((article) => {
            expect(typeof article.author).toBe("string");
            expect(typeof article.title).toBe("string");
            expect(typeof article.article_id).toBe("number");
            expect(typeof article.topic).toBe("string");
            expect(typeof article.created_at).toBe("object");
            expect(typeof article.votes).toBe("number");
            expect(typeof article.article_img_url).toBe("string");
            expect(typeof article.comment_count).toBe("number");
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
      .then((response) => {
        const articles = response.body.articles;
      });
      ...(incomplete)
  });
  */

  //5
  test("article object does not have a 'body' property", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        response.body.articles.forEach((article) => {
          expect(article).not.toHaveProperty("body");
        });
      });
  });

  /*
  //6
  test("comment_count matches number of comments in database for an article", () => {
    return request(app)
        .then((response) => {
      .expect(200)
      .then((response) => {
        const articles = response.body.articles;
        const checks = articles.map((article) => {
          const { article_id, comment_count } = article;
          return db
            .query(
              "SELECT COUNT(*)::int AS count FROM comments WHERE article_id = $1",
              [article_id]
            )
            .then((dbResponse) => {
              expect(comment_count).toBe(dbResponse.rows[0].count);
            });
        });
        return Promise.all(checks);
      });
  });
  */
});
