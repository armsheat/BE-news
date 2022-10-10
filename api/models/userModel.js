const db = require('./../../db/connection');
const format = require('pg-format');

function retrieveUsers() {
    return db.query(`SELECT * FROM users`).then(({ rows }) => {
        return rows;
    })
}

module.exports = retrieveUsers;