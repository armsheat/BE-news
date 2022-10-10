const db = require('./../../db/connection');

function retrieveTopics() {
    return db.query(`SELECT * FROM topics`).then(({ rows }) => {
        return rows;
    })
}

module.exports = retrieveTopics;