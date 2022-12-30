import StatusCodes from "http-status-codes";

const errorHandlerMiddleware = async (err, req, res, next) => {
  //console.log(err)
  const defaultError = {
    errorMessage:
      err.message || "Something went wrong. Please try again later.",
    errorStatusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.name === "ValidationError") {
    defaultError.errorStatusCode = StatusCodes.BAD_REQUEST;
    defaultError.errorMessage = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  }
  return res
    .status(defaultError.errorStatusCode)
    .send({ msg: defaultErrorMessage });
};

export default errorHandlerMiddleware;
