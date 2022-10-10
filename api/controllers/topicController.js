const retrieveTopics = require('../models/topicModel');

function getTopics(req, res, next) {
    retrieveTopics().then((topics) => {
        res.status(200).send({ topics });
    })   
    .catch((err) => {
        next(err);
    });
}

module.exports = getTopics;