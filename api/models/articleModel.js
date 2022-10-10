const db = require('./../../db/connection');

function retrieveArticleByID (article_id) {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id]).then(({ rows }) => {
        if (rows[0]) {
            return rows[0];
        } else {
            return Promise.reject({ status:404, msg:'no article found with that id'});
        }
    })
}

module.exports = retrieveArticleByID;