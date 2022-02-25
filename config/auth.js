const logger = require('pino')();

module.exports = (router) => {
    router.use('/auth/*', (req, res, next) => {
       logger.info(">>> /auth에만 사용되는 인증함수와 같은 것");
       next();
    });

    router.get('/login', (req, res) => {
        logger.info(">>> /auth/login");
        res.send('This is Login Page');
    });

    router.get('/logout', (req, res) => {
        logger.info(">>> /auth/logout");
        res.send('This is Logout Page');
    });
    return router;
}