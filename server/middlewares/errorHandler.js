import StatusCodes from "http-status-codes";

const errorHandlerMiddleware = async (err, req, res, next) => {
  const defaultError = {
    errorMessage:
      err.message || "Something went wrong. Please try again later.",
    errorStatusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.code === 11000) {
    defaultError.errorMessage =
      "Email already in use. Please provide other email.";
    defaultError.errorStatusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "ValidationError") {
    defaultError.errorStatusCode = StatusCodes.BAD_REQUEST;
    defaultError.errorMessage = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  }
  return res
    .status(defaultError.errorStatusCode)
    .send({ msg: defaultError.errorMessage });
};

export default errorHandlerMiddleware;
