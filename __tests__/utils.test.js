const mapCommentToArticleId = require("../db/seeds/utils");

describe("mapCommentToArticleId", () => {
  test("does not mutate the original array and returns a new array", () => {
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
    const result = mapCommentToArticleId(comments, articles);
    expect(result).not.toBe(comments); // new array returned
  });
});

//2
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
  const result = mapCommentToArticleId(comments, articles);
  expect(result[0].article_id).toBe(2);
});

//3
test("mapped articleID all other properties", () => {
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
  const result = mapCommentToArticleId(comments, articles);
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
  const result = mapCommentToArticleId(comments, articles);
  expect(result[0].article_id).toBeUndefined();
});
