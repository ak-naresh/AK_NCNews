const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const mapArticleTitleToId = require("../db/seeds/utils");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("mapArticleTitleToId", () => {
  // 1
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
    const result = mapArticleTitleToId(comments, articles);
    expect(result[0]).toHaveProperty("article_id", 2);
    expect(result[0]).toHaveProperty("body", comments[0].body);
    expect(result[0]).toHaveProperty("votes", comments[0].votes);
    expect(result[0]).toHaveProperty("author", comments[0].author);
    expect(result[0]).toHaveProperty("created_at", comments[0].created_at);
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
    const result = mapArticleTitleToId(comments, articles);
    expect(result).not.toBe(comments);
    expect(Array.isArray(result)).toBe(true);
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
  test("sets article_id to undefined if article_title does not match", () => {
    const comments = [{ article_title: "Nonexistent Article" }];
    const articles = [
      { article_id: 2, title: "Living in the shadow of a great man" },
    ];
    const result = mapArticleTitleToId(comments, articles);
    expect(result[0].article_id).toBeUndefined();
  });
});
