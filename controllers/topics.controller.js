const topicsModel = require("../models/topics.model");

function getTopics(request, response, next) {
  return topicsModel
    .fetchTopics()
    .then((topics) => {
      response.status(200).send({ topics });
    })
    .catch(next);
}

module.exports = { getTopics };
