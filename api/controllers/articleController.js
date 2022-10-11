const { retrieveArticleByID, AmendArticleByID, retrieveArticles, retrieveCommentsByArticle } = require('./../models/articleModel');

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
    console.log(article_id)

    getArticleByID(article_id).then((article) => {
        if (article.number_of_comments === 0) {
            res.status(200).send({ msg: 'this article has no comments' })
        }
    })
    //invoke get article by id
    // if the number of comments = 0
    // send msg 'this article has no comments'
    retrieveCommentsByArticle(req.params.article_id).then((comments) => {
        res.status(200).send({ comments });
    }).catch((err) => {
        next(err);
    });
}

module.exports = { getArticleByID, updateArticleByID, getArticles, getCommentsByArticle };