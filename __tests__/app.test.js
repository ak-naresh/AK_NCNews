const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const request = require("supertest");
const app = require("../app");
const { toBeSortedBy } = require("jest-sorted");

beforeEach(() => seed(data));
afterAll(() => db.end());

/*
Error Handling
*/

describe("Error Handling", () => {
  //1
  test("400 responds with bad request for invalid id", () => {
    return request(app)
      .get("/api/articles/invalid-id")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });

  test("404 responds with not found for custom error", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not Found");
      });
  });

  test("500 responds with internal server error for generic error", () => {
    return request(app)
      .get("/api/articles?fail=true")
      .expect(500)
      .then((response) => {
        expect(response.body.msg).toBe("Internal Server Error");
      });
  });
});

/*
GET /api/topics
*/

describe("GET /api/topics", () => {
  //1
  test("response has 'topics' property", () => {
    return request(app)
      .get("/api/topics")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("topics");
      });
  });

  //2
  test("'topics' is an array", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.topics)).toBe(true);
      });
  });

  //3
  test("Array is expected length of 3", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        expect(response.body.topics.length).toBe(3);
      });
  });

  //4
  test("first topic matches expected object", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        expect(response.body.topics[0]).toEqual({
          slug: "mitch",
          description: "The man, the Mitch, the legend",
        });
      });
  });
});

/*
GET /api/articles
*/

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
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("number");
        });
      });
  });

  //4
  test("articles are sorted by date descending", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const articles = response.body.articles;
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });

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

  //6
  test("comment_count matches number of comments in database for an article", async () => {
    const response = await request(app).get("/api/articles").expect(200);
    const articles = response.body.articles;
    const commentCountCheck = articles.map(async (article) => {
      const article_id = article.article_id;
      const comment_count = article.comment_count;
      const dbResult = await db.query(
        "SELECT COUNT(*) AS count FROM comments WHERE article_id = $1",
        [article_id]
      );
      expect(comment_count).toBe(parseInt(dbResult.rows[0].count, 10));
    });
    await Promise.all(commentCountCheck);
  });
});
