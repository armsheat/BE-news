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

function getArticles(req, res, next) {
    const { topic, sort_by, order } = req.query;
    retrieveArticles(topic, sort_by, order).then((articles) => {
        res.status(200).send({ articles });
    }).catch((err) => {
        next(err);
    });
}

function getCommentsByArticle(req, res, next) {
    const { article_id } = req.params;
    const promises = [retrieveCommentsByArticle(article_id), retrieveArticleByID(article_id)]

    Promise.all(promises).then((promises) => {
        if(promises[1].number_of_comments === '0') {
            res.status(200).send({ msg: 'this article has no comments' })
        } else { 
            res.status(200).send({ comments: promises[0] });
        }
    }).catch((err) => {
        next(err);
    });
    }

module.exports = { getArticleByID, updateArticleByID, getArticles, getCommentsByArticle };
