const db = require("../db/connection");
const { fetchTopics } = require("../models/topics.model");

/* 
1. Receives the request
2. Calls the model
3. Sends the response wrapping array of topic
*/

function getTopics(request, response, next) {
  fetchTopics()
    .then((topics) => {
      response.status(200).send({ topics });
    })
    .catch(next);
}

module.exports = { getTopics };
