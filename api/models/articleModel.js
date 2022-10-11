const db = require('./../../db/connection');

function retrieveArticleByID (article_id) {
    return db.query(`
    SELECT articles.* , COUNT(comments.article_id) AS number_of_comments 
    FROM articles 
    LEFT JOIN comments ON comments.article_id = articles.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`, 
    [article_id]).then(({ rows }) => {
        if (rows[0]) {
           return rows[0];
        } else {
            return Promise.reject({ status:404, msg:'no article found with that id'});
        }
    })
}

function AmendArticleByID(article_id, inc_votes) {
    return db.query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`, [inc_votes, article_id])
    .then(({ rows }) => {
        if (rows[0]) {
            return rows[0];
        } else {
            return Promise.reject({ status:404, msg:'no article found with that id'});
        }
    })
}


module.exports = { retrieveArticleByID, AmendArticleByID };