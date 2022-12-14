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

function retrieveCommentsByArticle(article_id) {
    return db.query(`
    SELECT * FROM comments 
    WHERE comments.article_id = $1`, 
    [article_id]).then(({ rows }) => {
           return rows;
    })
}

function retrieveArticles(topic, sort_by = 'created_at', order = 'DESC') {
    let baseQuery = `SELECT articles.* , COUNT(comments.article_id) AS number_of_comments 
    FROM articles 
    LEFT JOIN comments ON comments.article_id = articles.article_id`;
   
    const validColumns = ['title', 'created_at', 'author', 'body', 'votes', 'topic', 'number_of_comments'];
    const queryArray = [];
    

    if (topic) {
        
            queryArray.push(topic);
            baseQuery += ` WHERE topic = $1`;
               
    };
    baseQuery += ` GROUP BY articles.article_id`

    if(validColumns.includes(sort_by)) {
        baseQuery += ` ORDER BY ${sort_by} `
    }
    if(!order === 'ASC' || !order === 'DESC') {
        return Promise.reject({ status:400, msg:'Bad request'})
    } else {
        baseQuery += `${order};`
    }
    
    return db.query(baseQuery, queryArray).then(({ rows }) => {
        if (rows.length >= 0) {
            return rows;
        } 
        else {
            return Promise.reject({ status:404, msg:'invalid query'});
        }
    })
}

function addCommentOnArticle(article_id, body, user) {
    return db.query(`INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *`, [user, body, article_id]).then(({ rows }) => {
            return rows[0];
    })
}

module.exports = { retrieveArticleByID, AmendArticleByID, retrieveArticles, retrieveCommentsByArticle, addCommentOnArticle };

