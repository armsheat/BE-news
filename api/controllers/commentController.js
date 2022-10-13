const removeCommentByID = require('../models/commentModel')

function deleteCommentByID(req, res, next) {
    const { comment_id } = req.params;
    removeCommentByID(comment_id).then(() => {
        res.status(204).send()
    })
}

module.exports = deleteCommentByID