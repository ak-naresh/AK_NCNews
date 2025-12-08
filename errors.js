// Handles custom errors with status and msg
function handleCustomErrors(error, request, response, next) {
  if (error.status && error.msg) {
    response.status(error.status).send({ msg: error.msg });
  } else next(error);
}

// Handles 400 Bad Request (e.g., invalid input)
function handleBadRequest(error, request, response, next) {
  if (error.code === "22P02") {
    response.status(400).send({ msg: "Bad Request" });
  } else next(error);
}

// Handles 404 for unknown endpoints
function handlePathNotFound(request, response, next) {
  response.status(404).send({ msg: "Path Not Found" });
}

// Handles all other server errors
function handleServerErrors(error, request, response, next) {
  console.log(error);
  response.status(500).send({ msg: "Internal Server Error" });
}

module.exports = {
  handlePathNotFound,
  handleCustomErrors,
  handleBadRequest,
  handleServerErrors,
};
