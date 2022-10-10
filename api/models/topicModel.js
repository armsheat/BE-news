const db = require('./../../db/connection');
const format = require('pg-format');

function retrieveTopics() {
    return db.query(`SELECT * FROM topics`).then(({ rows }) => {
        return rows;
    })
}

module.exports = retrieveTopics;