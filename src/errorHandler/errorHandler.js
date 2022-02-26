import {CustomError} from "../error/customError";
import {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken";
import Logger from "../loaders/logger";

// 인자를 4개 취급하는 미들웨어는 "오류처리 미들웨어"라고 한다.
// 하지만 오류가 비동기적으로 발생하면 정상적인 처리가 불가능하다.
// 비동기로 발생한 오류는 이 곳에 도달하지 못한다.
const commonErrorHandler = (error, req, res) => {
    Logger.info("공통 에러 처리 미들웨어");
    res.status(500).json({
        status: 500,
        message: 'internal server error..',
    });
};

const customErrorHandler = (error, req, res) => {
    Logger.info("Custom 에러 처리 미들웨어");
    const {status, type, message} = error;
    res.status(status).json({
        status,
        message,
        type
    });
};

const validationErrorHandler = (error, req, res) => {
    Logger.info("validation 실패");
    res.status(422).json({
        type: error.type,
        //detail: error.error,
        message: error.error.message,
        context: error.error.details[0].context.label
    });
};

const jwtErrorHandler = (error, req, res) => {
    res.status(401).json({
        status: error.status,
        message: error.message
    });
};

const errorHandler = (error, req, res, next) => {
    //console.log(">>> here!!");
    //console.log(error);

    if (error instanceof CustomError) {
        // Custom Error
        customErrorHandler(error, req, res);

    } else if (error instanceof JsonWebTokenError) {
        // JWT token Error
        jwtErrorHandler(error, req, res);

    } else if (error && error.error && error.error.isJoi) {
        // joi validation Error
        validationErrorHandler(error, req, res);

    } else {
        // All of Error
        commonErrorHandler(error, req, res);
    }
};

export default (error, req, res, next) => {
    errorHandler(error, req, res, next);
}