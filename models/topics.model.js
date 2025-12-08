const db = require("../db/connection");

/* 
Queries the database to get all topics and returns a promis
Query selects both 'slug' && 'description' from topics table, so each topic object in the result will contain both fields.
*/

function fetchTopics() {
  return db.query(`SELECT slug, description FROM topics;`).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Path Not Found" });
    } else {
      return result.rows;
    }
  });
}

module.exports = { fetchTopics };
