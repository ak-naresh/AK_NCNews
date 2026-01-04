const db = require("../db/connection");

//fetchTopics
function fetchTopics() {
  return db
    .query(`SELECT slug, description FROM topics;`)
    .then((result) => result.rows);
}

module.exports = { fetchTopics };
