const db = require('./../../db/connection');
const fs = require('fs/promises')
const endpointJSON = require('../../endpoints.json')

function retrieveTopics() {
    return db.query(`SELECT * FROM topics`).then(({ rows }) => {
        return rows;
    })
}

function retrieveJSON() {
    return Promise.resolve(endpointJSON);
}

module.exports = { retrieveTopics, retrieveJSON };