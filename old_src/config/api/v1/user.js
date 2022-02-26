const logger = require('pino')();
const grpc_client = require('../../../common/grpc/client/grpc_client');

module.exports = (router) => {
    router.use((req, res, next) => {
        logger.info(">> 0) /api/v1/users/*");
        next();
    });

    router.get('/users', (req, res, next) => {
        res.json({
            name: 'dslee03',
            age: 31
        });
    });

    router.get('/users/:user_id', (req, res, next) => {
        const user_id = req.params.user_id;
        logger.info(`>> 1) /users/${user_id}`);

        if (user_id === 'hello') {
            next('route');
            return;
        }

        // grpc client를 통해서 데이터 전달
        grpc_client.helloClient.getUserInfo({
            id_here: 'tester',
            age_kr: 1000,
            something: ['test', 'test1', 'test2']
        }, (error, result) => {
            res.json(result);
        });
    });

    router.get('/users/:user_id', (req, res, next) => {
        const user_id = req.params.user_id;
        logger.info(`>> 2) /users/${user_id}`);
        res.json({
            id: user_id,
            age: 31,
            router_step: 2,
        });
    });

    return router;
}