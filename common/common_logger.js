const logger = require('pino')();

// 공통 로거
module.exports = (req, res, next) => {
    logger.info(`>> 최초진입.`);
    next();
};