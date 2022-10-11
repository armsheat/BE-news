
const { retrieveArticleByID, AmendArticleByID, retrieveCommentsByArticle, retrieveArticles } = require('./../models/articleModel');


function getArticleByID(req, res, next) {
    const { article_id } = req.params;
    retrieveArticleByID(article_id).then((article) => {
        res.status(200).send({ article });
    }).catch((err) => {
        next(err);
    });
}

function updateArticleByID(req, res, next) {
    const { article_id } = req.params;
    const { inc_votes } = req.body;
    AmendArticleByID(article_id, inc_votes).then((article) => {
        res.status(200).send({ article });
    }).catch((err) => {
        next(err);
    });
}

function getCommentsByArticle(req, res, next) {
    const { article_id } = req.params;
    retrieveCommentsByArticle(article_id).then((article) => {
        res.status(200).send({ article });
    }).catch((err) => {
        next(err);
    });
}

function getArticles(req, res, next) {
    const { topic } = req.query;
    retrieveArticles(topic).then((articles) => {
        res.status(200).send({ articles });
    }).catch((err) => {
        next(err);
    });
}


module.exports = { getArticleByID, updateArticleByID, getCommentsByArticle, getArticles };

