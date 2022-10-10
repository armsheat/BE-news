const retrieveTopics = require('../models/topicModel');

function getTopics(req, res, next) {
    retrieveTopics().then((topics) => {
        res.status(200).send({ topics });
    })    
}

module.exports = getTopics;