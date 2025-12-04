const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app");

beforeAll(() => seed(testData));
afterAll(() => db.end());

//GET /api/topics
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
