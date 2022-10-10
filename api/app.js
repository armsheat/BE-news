const express = require('express');
const app = express();

const getTopics = require('./controllers/topicController');

app.use(express.json());

app.get("/api/topics", getTopics);

//all wrong paths get a 404
app.all("/api/*", (req, res, next) => {
    res
      .status(404)
      .send({ msg: "page cannot be found." });
  });

//DEFAULT ERROR HANDLING
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "INTERNAL SERVER ERROR." });
  });

module.exports = app;