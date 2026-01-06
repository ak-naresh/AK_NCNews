//404 Handler (first middleware)
function handlePathNotFound(request, response, next) {
  response.status(404).send({ message: "Path Not Found" });
}

//Custom-error Handler
function handleCustomErrors(error, request, response, next) {
  if (error.status && error.message) {
    response.status(error.status).send({ message: error.message });
  } else {
    console.log(error);
    response.status(500).send({ message: "Internal Server Error" });
  }
}

//400 Handler
function handleBadRequest(error, request, response, next) {
  if (error.code === "22P02") {
    response.status(400).send({ message: "Bad Request" });
  } else next(error);
}

//All other server-errors Handler
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
