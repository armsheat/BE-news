const { retrieveArticleByID, AmendArticleByID } = require('./../models/articleModel');

function getArticleByID(req, res, next) {
    const { article_id } = req.params;
    retrieveArticleByID(article_id).then((article) => {
        res.status(200).send({ article });
    }).catch((err) => {
        next(err);
    });
}

function updateArticleByID(req, res, next) {
    console.log('in the controller')
    const { article_id } = req.params;
    const { inc_votes } = req.body;
    AmendArticleByID(article_id, inc_votes).then((article) => {
        res.status(200).send({ article });
    }).catch((err) => {
        next(err);
    });
}

module.exports = { getArticleByID, updateArticleByID };