const db = require("../db/connection");

function fetchTopics() {
  return db
    .query(`SELECT slug, description FROM topics;`)
    .then((result) => result.rows);
}

module.exports = { fetchTopics };
