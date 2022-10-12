const { afterAll, beforeEach } = require("@jest/globals");
const request = require("supertest");
const toBeSortedBy = require('jest-sorted');

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
  test('status 200, responds with the correct article object and comment count', () => {
    return request(app)
    .get("/api/articles/3")
    .expect(200)
    .then(({ body }) => {
      const { article } = body;
        expect(article).toEqual(
          {
              article_id: 3,
              title: "Eight pug gifs that remind me of mitch",
              topic: "mitch",
              author: "icellusedkars",
              body: "some gifs",
              created_at: "2020-11-03T09:12:00.000Z",
              votes: 0,
              number_of_comments: '2',
          }
        );
    }); 
  });
  test('status 200, responds with the article object if there are no comments', () => {
    return request(app)
    .get("/api/articles/4")
    .expect(200)
    .then(({ body }) => {
      const { article } = body;
        expect(article).toEqual({
          article_id: 4,
          title: "Student SUES Mitch!",
          topic: "mitch",
          author: "rogersop",
          body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
          created_at: "2020-05-06T01:14:00.000Z",
          votes: 0,
          number_of_comments: '0',
        })
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

describe('GET api/articles', () => {
  test('status 200: returns an array of all articles', () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(({ body }) => {
      expect(body.articles).toBeInstanceOf(Array);
      expect(body.articles.length).toBe(12);
      body.articles.forEach((article) => {
        expect(article).toEqual(
          expect.objectContaining({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            number_of_comments: expect.any(String),
          })
        );
      });
    });       
  });
  test('status 200: takes a query to filter by topic', () => {
    return request(app)
    .get("/api/articles?topic=cats")
    .expect(200)
    .then(({ body }) => {
      expect(body.articles).toBeInstanceOf(Array);
      expect(body.articles.length).toBe(1);
      expect(body.articles).toEqual(
        [{
          article_id: 5,
          title: "UNCOVERED: catspiracy to bring down democracy",
          topic: "cats",
          author: "rogersop",
          body: "Bastet walks amongst us, and the cats are taking arms!",
          created_at: '2020-08-03T13:14:00.000Z',
          votes: 0,
          number_of_comments: '2',
        }]
      )
    });

  });
  test('status 200: the articles should be sorted by date descending', () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(({ body }) => {
      expect(body.articles).toBeInstanceOf(Array);
      expect(body.articles.length).toBe(12);
      expect(body.articles).toBeSortedBy("created_at", {
        descending: true,
      });
  });
  });
  test('status 400: the query is not a valid topic', () => {
    return request(app)
    .get("/api/articles?topic=dogs")
    .expect(400)
    .then(( { body }) => {
      const { msg } = body;
      expect(msg).toBe('Bad request')
    })
  });
  test('status 400: the query is the wrong type', () => {
    return request(app)
    .get("/api/articles?topic=SELECT * FROM users")
    .expect(400)
    .then(( { body }) => {
      const { msg } = body;
      expect(msg).toBe('Bad request');
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

describe('PATCH "api/articles/:article_id"', () => {
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
  test('can update the votes with a negative number', () => {
    return request(app)
    .patch("/api/articles/4")
    .send({ 'inc_votes' : -100 })
    .expect(200)
    .then(({ body }) => {
      const { article } = body
      expect(article.votes).toBe(-100)
    })
  });
  test('status 404, responds with not found when wrong article id put in', () => {
    return request(app)
    .patch("/api/articles/20000")
    .send({ 'inc_votes' : 100 })
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe('no article found with that id')
    })
  });
  test('status 400, when the article_id is not a number', () => {
    return request(app)
    .patch("/api/articles/SELECT * FROM articles")
    .send({ 'inc_votes' : 100 })
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe('Bad request');
    })
  });
  test('status 400, when inc_votes is not a number', () => {
    return request(app)
    .patch("/api/articles/2")
    .send({ 'inc_votes' : 'SELECT * FROM articles' })
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe('Bad request');
    })
  });
  test('status 400, when inc_votes is empty', () => {
    return request(app)
    .patch("/api/articles/3")
    .send({})
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe('Bad request');
    })
  });
});

describe('GET api/articles/:article_id/comments', () => {
  
});
  
