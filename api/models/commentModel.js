const db = require('./../../db/connection')

function removeCommentByID(comment_id) {
    console.log(comment_id);
    return db.query(`DELETE FROM comments WHERE comment_id = $1;`, [comment_id]).then((result) => {
        return result.rowCount;
    })
}

module.exports = removeCommentByID;