//Handles custom errors
function handleCustomErrors(error, request, response, next) {
  if (error.status && error.message) {
    response.status(error.status).send({ message: error.message });
  } else next(error);
}

//Handles 400 Bad Request
function handleBadRequest(error, request, response, next) {
  if (error.code === "22P02") {
    response.status(400).send({ message: "Bad Request" });
  } else next(error);
}

//Handles 404 Path Not Found
function handlePathNotFound(request, response, next) {
  response.status(404).send({ message: "Path Not Found" });
}

//Handles all other server errors
function handleServerErrors(error, request, response, next) {
  console.log(error);
  response.status(500).send({ message: "Internal Server Error" });
}

module.exports = {
  handlePathNotFound,
  handleCustomErrors,
  handleBadRequest,
  handleServerErrors,
};
