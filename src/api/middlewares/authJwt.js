import {verify} from '../../utils/jwt';
import Logger from '../../loaders/logger';
import {CustomError} from "../../error/customError";
import {TokenExpiredError} from 'jsonwebtoken';

/**
 * client의 header에 포함된 jwt 토큰이 유효한지 확인
 * @param req Request
 * @param res Response
 * @param next Go to next step
 * @returns {*}
 */
const authJwt = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split("Bearer ")[1];

        try {
            const test = verify(token);
            Logger.info(test);
            if (test.ok) {
                next();
                return;
            }

        } catch (err) {
            //console.log(err);
            next(err);
            return;
        }
    }
    next(new CustomError('type', 400, '헤더에 authorization는 필수 값 입니다.'));
};

module.exports = {
    authJwt,
}
