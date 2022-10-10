const express = require('express');
const app = express();

const getTopics = require('./controllers/topicController');

app.use(express.json());

app.get("/api/topics", getTopics);

app.all("*", (req, res, next) => {
    res
      .status(404)
      .send({ msg: "page cannot be found." });
  });

module.exports = app;