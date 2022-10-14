const { retrieveTopics, retrieveJSON } = require('../models/topicModel');

function getTopics(req, res, next) {
    retrieveTopics().then((topics) => {
        res.status(200).send({ topics });
    })   
    .catch((err) => {
        next(err);
    });
}

function getJSON(req, res, next) {
    retrieveJSON().then((endpoints) => {
        res.status(200).send({ endpoints })
    })
    .catch((err) => {
        next(err);
    });
}

module.exports = { getTopics, getJSON };