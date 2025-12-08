const db = require("../db/connection");

function selectUsers() {
  // Model: Retrieves all users from the database
  return db
    .query("SELECT username, name, avatar_url FROM users;")
    .then(({ rows }) => {
      return rows;
    });
}

module.exports = {
  selectUsers,
};
