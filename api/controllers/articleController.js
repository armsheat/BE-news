const retrieveArticleByID = require('./../models/articleModel');

function getArticleByID(req, res, next) {
    const { article_id } = req.params;
    retrieveArticleByID(article_id).then((article) => {
        res.status(200).send({ article });
    }).catch((err) => {
        next(err);
    });
}

module.exports = getArticleByID;