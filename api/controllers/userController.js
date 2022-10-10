const retrieveUsers = require('./../models/userModel')

function getUsers(req, res, next) {
    retrieveUsers().then((users) => {
        res.status(200).send({ users });
    })   
    .catch((err) => {
        next(err);
    });
}

module.exports = getUsers;