const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

const request = require("supertest");
const app = require("../app");
const { toBeSortedBy } = require("jest-sorted");

beforeEach(() => seed(data));
afterAll(() => db.end());

//Error Handling
describe("Error Handling", () => {
  test("400 response with Invalid article_id: must be a number for invalid id", () => {
    return request(app)
      .get("/api/articles/9u99")
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe(
          "Invalid article_id: must be a number"
        );
      });
  });

  test("404 response with Path Not Found for non-existent endpoint", () => {
    return request(app)
      .get("/api/banana")
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("Path Not Found");
      });
  });

  test("404 response with custom error for missing article", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("Not Found");
      });
  });
});

//GET /api/topics
describe("GET /api/topics", () => {
  test("topics responds with 200", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("topics");
      });
  });

  test("topics is an array", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.topics)).toBe(true);
      });
  });

  test("topics array is expected length of 3 (slug, description, img_url)", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        expect(response.body.topics.length).toBe(3);
      });
  });

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

//GET /api/articles
describe("GET /api/articles", () => {
  test("articles response with 200", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("articles");
      });
  });

  test("articles is an array", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.articles)).toBe(true);
      });
  });

  test("articles array is expected length of 13", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(response.body.articles.length).toBe(13);
      });
  });

  test("each article has correct properties including comment_count", () => {
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

  test("articles are sorted by date descending", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });

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

  test("comment_count for first and last article is correct", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(response.body.articles[0].comment_count).toBe(2);
        expect(
          response.body.articles[response.body.articles.length - 1]
            .comment_count
        ).toBe(0);
      });
  });
});

//GET /api/articles/:article_id
describe("GET /api/articles/:article_id", () => {
  test("article_id responds with 200", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("article");
        expect(response.body.article).toHaveProperty("article_id");
      });
  });

  test("article is an object", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        expect(typeof response.body.article).toBe("object");
      });
  });
});

test("404 response with Not Found for non-existent article_id (ID not found))", () => {
  return request(app)
    .get("/api/articles/9999")
    .expect(404)
    .then((response) => {
      expect(response.body.message).toBe("Not Found");
    });
});

test("400 response with Invalid article_id: must be a number for invalid article_id (ID is NaN)", () => {
  return request(app)
    .get("/api/articles/9u99")
    .expect(400)
    .then((response) => {
      expect(response.body.message).toBe(
        "Invalid article_id: must be a number"
      );
    });
});

test("404 response with Path Not Found for non-existent endpoint", () => {
  return request(app)
    .get("/api/banana")
    .expect(404)
    .then((response) => {
      expect(response.body.message).toBe("Path Not Found");
    });
});

//GET /api/articles/:article_id/comments
describe("GET /api/articles/:article_id/comments", () => {
  test("comments responds with 200", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("comments");
      });
  });

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

  test("comments is an array", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.comments)).toBe(true);
      });
  });

  test("comments are sorted by date descending", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        expect(response.body.comments).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });

  test("400 response with Invalid article_id: must be a number for invalid article_id (ID is NaN) ", () => {
    return request(app)
      .get("/api/articles/9u99/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe(
          "Invalid article_id: must be a number"
        );
      });
  });

  test("404 response with not found for non-existent article_id (ID not found)", () => {
    return request(app)
      .get("/api/articles/9999/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("Not Found");
      });
  });
});

//POST /api/articles/:article_id/comments
describe("POST /api/articles/:article_id/comments", () => {
  test("201 response for posting created comment", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ username: "butter_bridge", body: "Great article!" })
      .expect(201)
      .then((response) => {
        expect(response.body.comment).toMatchObject({
          article_id: 1,
          body: "Great article!",
          author: "butter_bridge",
        });
      });
  });

  test("400 response for username and/or body missing in request body", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ username: "butter_bridge" })
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe("Missing field in body");
      });
  });

  test("404 response for non-existent article", () => {
    return request(app)
      .post("/api/articles/9999/comments")
      .send({ username: "butter_bridge", body: "Nice!" })
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("Article not found");
      });
  });
});

//DELETE /api/comments/:comment_id
describe("DELETE /api/comments/:comment_id", () => {
  test("204 response for successful deletion of comment", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });

  test("404 response for non-existent comment_id", () => {
    return request(app)
      .delete("/api/comments/9999")
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("Comment not found");
      });
  });

  test("400 response for invalid comment_id (NaN)", () => {
    return request(app)
      .delete("/api/comments/9u99")
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe(
          "Invalid comment_id: must be a number"
        );
      });
  });
});

//PATCH /api/articles/:article_id
describe("PATCH /api/articles/:article_id", () => {
  test("200 response for updated article when inc_values is an integer", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 5 })
      .expect(200)
      .then((response) => {
        expect(response.body.article.votes).toBe(105);
      });
  });

  test("400 response when inc_votes is missing in request body", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe(
          "Invalid inc_votes: must be a number"
        );
      });
  });

  test("400 response when inc_votes is NaN", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "five" })
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe(
          "Invalid inc_votes: must be a number"
        );
      });
  });

  test("404 response when article_ID is non-existent", () => {
    return request(app)
      .patch("/api/articles/9999")
      .send({ inc_votes: 5 })
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("Article not found");
      });
  });

  test("updates article votes correctly following an incremention or decremention", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -10 })
      .expect(200)
      .then((response) => {
        expect(response.body.article.votes).toBe(90);
      });
  });

  test("does not modify any other properties within article", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 15 })
      .expect(200)
      .then((response) => {
        expect(response.body.article).toMatchObject({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
        });
      });
  });
});

//GET /api/users
describe("GET /api/users", () => {
  test("user responds with 200", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("users");
      });
  });

  test("users is an array", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.users)).toBe(true);
      });
  });

  test("users array is expected length of 4", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        expect(response.body.users.length).toBe(4);
      });
  });

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
