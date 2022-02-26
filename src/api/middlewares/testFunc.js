import Logger from "../../loaders/logger";
import {CustomError} from "../../error/customError";

const func1 = async(req, res, next) => {
    Logger.info(req);
    Logger.info("func1 - 추가동작");
    next();
};

const func2 = async (req, res, next) => {
    Logger.info("func2 - 추가동작");
    if (! req.query.id) {
        next(new CustomError("Error", 401,"error!!!"));
    }
    next();
}

module.exports = {
    func1,
    func2
}

