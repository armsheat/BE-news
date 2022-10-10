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

describe('GET api/articles/:article_id', () => {
  test('status 200, responds with the correct article object', () => {
    return request(app)
    .get("/api/articles/2")
    .expect(200)
    .then(({ body }) => {
      const { article } = body;
        expect(article).toEqual(
          {
            article_id: 2,
            title: "Sony Vaio; or, The Laptop",
            topic: "mitch",
            author: "icellusedkars",
            body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
            created_at: '2020-10-16T05:03:00.000Z',
            votes: 0,
          }
        );
    }); 
  });
  test('status 404, responds with not found when wrong article id put in', () => {
    return request(app)
    .get("/api/articles/20000")
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe('no article found with that id')
    })
  });
  test('status 400, when the id is not a number', () => {
    return request(app)
    .get("/api/articles/SELECT * FROM articles")
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe('Bad request');
    })
  });
});

describe('GET api/users', () => {
  test('status 200, responds with an array of user objects', () => {
    return request(app)
    .get("/api/users")
    .expect(200)
    .then(({ body }) => {
      expect(body.users).toBeInstanceOf(Array);
      expect(body.users.length).toBe(4);
      body.users.forEach((user) => {
        expect(user).toEqual(
          expect.objectContaining({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          })
        );
      });
    }); 
  });
  test('status 404, responds with a page cannot be found message when wrong path put in', () => {
    return request(app)
      .get("/api/user")
      .expect(404)
      .then(( { body }) => {
        const { msg } = body;
        expect(msg).toBe('page cannot be found.')
      })
  });
});

describe.only('PATCH "api/articles/:article_id"', () => {
  test('status 200, responds with the updated article and correctly amended votes', () => {
    return request(app)
    .patch("/api/articles/2")
    .send({ 'inc_votes' : 100 })
    .expect(200)
    .then(({ body }) => {
      const { article } = body
      expect(article).toEqual(
        {
          article_id: 2,
          title: "Sony Vaio; or, The Laptop",
          topic: "mitch",
          author: "icellusedkars",
          body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
          created_at: '2020-10-16T05:03:00.000Z',
          votes: 100,
        })
    })
  });
});