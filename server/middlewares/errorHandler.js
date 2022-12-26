import StatusCodes from "http-status-codes"

const errorHandlerMiddleware = async (err, req, res, next) => {
    //console.log(err)
    let defaultErrorMessage = err.errors || "Something went wrong. Please try again later."
    let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR

    if (err.name === "ValidationError") {
    }
    return res.status(statusCode).send({ msg: defaultErrorMessage })
}

export default errorHandlerMiddleware