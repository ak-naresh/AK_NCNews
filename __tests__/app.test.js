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
  test("400 responds with Bad Request for invalid id", () => {
    return request(app)
      .get("/api/articles/invalid-id")
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe("Bad Request");
      });
  });

  //2
  test("404 responds with Path Not Found for unknown endpoint", () => {
    return request(app)
      .get("/api/nonexistent-endpoint")
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("Path Not Found");
      });
  });

  //3
  test("404 responds with custom error for missing article", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("Not Found");
      });
  });
});

/*
GET /api/topics
*/
describe("GET /api/topics", () => {
  //1
  test("topics responds with 200 and correct content type", () => {
    return request(app)
      .get("/api/topics")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("topics");
      });
  });

  //2
  test("topics is an array", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.topics)).toBe(true);
      });
  });

  //3
  test("topics array is expected length of 3 (slug, description, img_url)", () => {
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
  test("articles responds with 200 and correct content type", () => {
    return request(app)
      .get("/api/articles")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("articles");
      });
  });

  //2
  test("articles is an array", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.articles)).toBe(true);
      });
  });

  //3
  test("articles array is expected length of 13", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(response.body.articles.length).toBe(13);
      });
  });

  //4
  test("each article has required properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        response.body.articles.forEach((article) => {
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

  //5
  test("each article property is correct type", () => {
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

  //6
  test("articles are sorted by date descending", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const articles = response.body.articles;
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });

  //7
  test("article object does not have a body property", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        response.body.articles.forEach((article) => {
          expect(article).not.toHaveProperty("body");
        });
      });
  });

  //8
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

/*
GET /api/articles/:article_id
*/
describe("GET /api/articles/:article_id", () => {
  //1
  test("article_id responds with 200 and correct content type", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("article");
        const article = response.body.article;
        expect(article).toHaveProperty("article_id");
      });
  });

  //2
  test("article is an object", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        expect(typeof response.body.article).toBe("object");
      });
  });
});

/*
GET /api/articles/:article_id/comments
*/
describe("GET /api/articles/:article_id/comments", () => {
  //1
  test("comments responds with 200 and correct content type", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("comments");
      });
  });

  //2
  test("comments array each has required properties", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        response.body.comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id");
          expect(comment).toHaveProperty("votes");
          expect(comment).toHaveProperty("created_at");
          expect(comment).toHaveProperty("author");
          expect(comment).toHaveProperty("body");
          expect(comment).toHaveProperty("article_id");
        });
      });
  });

  //4
  test("each comment property is correct type", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        response.body.comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.article_id).toBe("number");
        });
      });
  });

  //5
  test("comments is an array", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.comments)).toBe(true);
      });
  });

  //6
  test("comments array is sorted by date descending", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        const comments = response.body.comments;
        for (let i = 1; i < comments.length; i++) {
          expect(
            new Date(comments[i - 1].created_at) >=
              new Date(comments[i].created_at)
          ).toBe(true);
        }
      });
  });

  //7
  test("400 responds with bad request for invalid article_id (ID is not a number) ", () => {
    return request(app)
      .get("/api/articles/invalid-id/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe("Bad Request");
      });
  });

  //8
  test("404 responds with not found for non-existent article_id (ID not found)", () => {
    return request(app)
      .get("/api/articles/9999/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("Not Found");
      });
  });
});

/*
POST /api/articles/:article_id/comments
*/
describe("POST /api/articles/:article_id/comments", () => {
  //1
  test("200 responds with posted comment when entering valid data", () => {
    const newComment = { username: "butter_bridge", body: "Great article!" };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(200)
      .then((res) => {
        expect(res.body.comment).toMatchObject({
          article_id: 1,
          body: "Great article!",
          author: "butter_bridge",
        });
      });
  });

  //2
  test("400 responds with error for missing fields", () => {
    const badComment = { username: "butter_bridge" };
    return request(app)
      .post("/api/articles/1/comments")
      .send(badComment)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe("Missing field in request body");
      });
  });

  //3
  test("404 responds with error for non-existent article", () => {
    const newComment = { username: "butter_bridge", body: "Nice!" };
    return request(app)
      .post("/api/articles/9999/comments")
      .send(newComment)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("Article not found");
      });
  });

  //4
  test("404 responds with error for non-existent user", () => {
    const newComment = { username: "hillybilly123", body: "shalom!" };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("User not found");
      });
  });
});

/*
GET /api/users
*/
describe("GET /api/users", () => {
  //1
  test("users responds with 200 and correct content type", () => {
    return request(app)
      .get("/api/users")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  //2
  test("response has users property", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("users");
      });
  });

  //3
  test("users is an array", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.users)).toBe(true);
      });
  });

  //4
  test("users array is expected length of 4", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        expect(response.body.users.length).toBe(4);
      });
  });

  //5
  test("each user has required properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        response.body.users.forEach((user) => {
          expect(user).toHaveProperty("username");
          expect(user).toHaveProperty("name");
          expect(user).toHaveProperty("avatar_url");
        });
      });
  });

  //6
  test("each user property is correct type", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        response.body.users.forEach((user) => {
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        });
      });
  });
});
