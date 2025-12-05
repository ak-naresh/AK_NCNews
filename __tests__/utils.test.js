const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const lookupArticleId = require("../db/seeds/utils");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("lookupArticleId", () => {
  //1
  test("maps article_title to article_id correctly", () => {
    const comments = [
      {
        article_title: "Living in the shadow of a great man",
        body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        votes: 14,
        author: "butter_bridge",
        created_at: new Date(1604113380000),
      },
    ];
    const articles = [
      {
        article_id: 2,
        title: "Living in the shadow of a great man",
        body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        votes: 14,
        author: "butter_bridge",
        created_at: new Date(1604113380000),
      },
    ];
    const result = lookupArticleId(comments, articles);
    expect(result[0].article_id).toBe(2);
  });

  //2
  test("does not mutate original array and returns a new array", () => {
    const comments = [
      {
        article_title: "Living in the shadow of a great man",
        body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        votes: 14,
        author: "butter_bridge",
        created_at: new Date(1604113380000),
      },
    ];
    const articles = [
      {
        article_id: 2,
        title: "Living in the shadow of a great man",
        body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        votes: 14,
        author: "butter_bridge",
        created_at: new Date(1604113380000),
      },
    ];
    const result = lookupArticleId(comments, articles);
    expect(result).not.toBe(comments);
    expect(comments).toEqual([
      {
        article_title: "Living in the shadow of a great man",
        body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        votes: 14,
        author: "butter_bridge",
        created_at: new Date(1604113380000),
      },
    ]);
  });

  //3
  test("mapped articleID properties", () => {
    const comments = [
      {
        article_title: "Living in the shadow of a great man",
        body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        votes: 14,
        author: "butter_bridge",
        created_at: new Date(1604113380000),
      },
    ];
    const articles = [
      {
        article_id: 2,
        title: "Living in the shadow of a great man",
        body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        votes: 14,
        author: "butter_bridge",
        created_at: new Date(1604113380000),
      },
    ];
    const result = lookupArticleId(comments, articles);
    expect(result[0]).toEqual({
      body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
      votes: 14,
      author: "butter_bridge",
      created_at: new Date(1604113380000),
      article_id: 2,
    });
  });

  //4
  test("sets article_id to undefined if article_title does not match any article", () => {
    const comments = [
      {
        article_title: "Nonexistent Article",
        body: "Test body",
        votes: 1,
        author: "user",
        created_at: new Date(1604113380000),
      },
    ];
    const articles = [
      {
        article_id: 2,
        title: "Living in the shadow of a great man",
        body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        votes: 14,
        author: "butter_bridge",
        created_at: new Date(1604113380000),
      },
    ];
    const result = lookupArticleId(comments, articles);
    expect(result[0].article_id).toBeUndefined();
  });
});
