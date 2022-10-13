
const { retrieveArticleByID, AmendArticleByID, retrieveCommentsByArticle, retrieveArticles, addCommentOnArticle } = require('./../models/articleModel');

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
    const { topic } = req.query;
    retrieveArticles(topic).then((articles) => {
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

function postCommentonArticle(req, res, next) {
    const { article_id } = req.params;
    const { body, user } = req.body
    const promises = [retrieveArticleByID(article_id), addCommentOnArticle(article_id, body, user) ]

    Promise.all(promises).then((promises) => {
        res.status(201).send({ comment: promises[1] })
    }).catch((err) => {
        next(err);
    });
}

module.exports = { getArticleByID, updateArticleByID, getArticles, getCommentsByArticle, postCommentonArticle };
