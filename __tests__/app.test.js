const { afterAll, beforeEach } = require("@jest/globals");
const request = require("supertest");

const seed = require("../db/seeds/seed");
const db = require('../db/connection');
const testData = require("../db/data/test-data");
const app = require("../api/app");

afterAll(() => db.end());
beforeEach(() => seed(testData));

describe('GET /api/topics', () => {
    test('should return an array of topic objects containing a slug and description', () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).toBeInstanceOf(Array);
          expect(body.topics.length).toBe(3);
          body.topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
              })
            );
          });
        });       
    });
});