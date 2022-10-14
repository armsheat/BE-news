const db = require('./../../db/connection')

function removeCommentByID(comment_id) {
    return db.query(`DELETE FROM comments WHERE comment_id = $1;`, [comment_id]).then((result) => {
        if (result.rowCount === 1){
            return(result.rowCount)
        } else {
            return Promise.reject({ status:404, msg:'invalid comment_id'})
        }
    })
}

module.exports = removeCommentByID;