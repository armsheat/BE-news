const { afterAll, beforeEach } = require("@jest/globals");
const request = require("supertest");

const seed = require("../db/seeds/seed");
const db = require('../db/connection');
const testData = require("../db/data/test-data");
const app = require("../api/app");

afterAll(() => db.end());
beforeEach(() => seed(testData));

describe('GET /api/topics', () => {
    test('status 200, should return an array of topic objects containing a slug and description', () => {
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
    test('status 404, responds with a page cannot be found message when wrong path put in', () => {
      return request(app)
        .get("/api/topic")
        .expect(404)
        .then(( { body }) => {
          const { msg } = body;
          expect(msg).toBe('page cannot be found.')
        })
    });
});

describe('GET api/users', () => {
  test('status 200, responds with ', () => {
    return request(app)
    .get("/api/users")
    .expect(200)
    .then(({ body }) => {
      expect(body.users).toBeInstanceOf(Array);
      expect(body.users.length).toBe(3);
      body.users.forEach((user) => {
        expect(user).toEqual(
          expect.objectContaining({
            slug: expect.any(String),
            description: expect.any(String),
          })
        );
      });
    });    
  });
});