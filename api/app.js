const express = require('express');
const app = express();

const getTopics = require('./controllers/topicController');

const { getArticleByID, updateArticleByID, getArticles } = require('./controllers/articleController');

const getUsers = require('./controllers/userController');

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleByID);

app.get("/api/articles", getArticles)

app.get("/api/users", getUsers);

app.patch("/api/articles/:article_id", updateArticleByID)

//all wrong paths get a 404
app.all("/api/*", (req, res, next) => {
    res
      .status(404)
      .send({ msg: "page cannot be found." });
  });

//JS ERROR HANDLING
app.use((err, req, res, next) => {
    if (err.status) { 
      res.status(err.status).send({ msg: err.msg });
    } else {
      next(err);
    }
  });

//PSQL ERROR HANDLING
app.use((err, req, res, next) => {
    if (err.code && err.code.length === 5) {
      res.status(400).send({ msg: "Bad request" });
    } else {
      next(err);
    }
  });

//DEFAULT ERROR HANDLING
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "INTERNAL SERVER ERROR." });
  });

module.exports = app;