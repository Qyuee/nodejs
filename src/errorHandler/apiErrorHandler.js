/**
 * Api Error Handler
 */
import ApiError from "../error/apiError";

const apiErrorHandler = (error, req, res, next) => {

    if (error instanceof ApiError.NotFound
    || error instanceof ApiError.BadRequest
    || error instanceof ApiError.Unauthorized) {
        res.status(error.statusCode).json({
            statusCode: error.statusCode,
            message: error.message
        });

    } else {
        next(error);
    }
};

export default (error, req, res, next) => {
    apiErrorHandler(error, req, res, next);
}