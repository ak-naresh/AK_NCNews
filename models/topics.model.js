const db = require("../db/connection");

exports.fetchTopics = () => {
  /* 
Queries the database to get all topics and returns a promis
Query selects both 'slug' && 'description' from topics table, so each topic object in the result will contain both fields.
*/
  return db
    .query("SELECT slug, description FROM topics;")
    .then((result) => result.rows);
};
