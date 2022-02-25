const express = require('express');
const logger = require('pino')();
const { v4: uuidv4 } = require('uuid');
const grpc_server = require('./common/grpc/grpc_server');

const router = express.Router();
const app = express();
const port = process.env.PORT || 3000;

// 써드파티 미들웨어
const responseTime = require('response-time');

//Express 4.16.0버전 부터 body-parser의 일부 기능이 익스프레스에 내장 body-parser 연결
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// response header에 응답시간이 추가됨
app.use(responseTime());

const common_logger = require('./common/common_logger');
const {json} = require("express");
// 모든 경로에 대해서 거쳐가는 경로
app.use(common_logger);
// req객체에 `requestTime`이라는 공통적인 값을 추가
app.use((req, res, next) => {
    req.requestTime = Date.now();
    req.trace_id = uuidv4();
    next();
});

// 라우터 레벨 미들웨어
router.get('/', (req, res, next) => {
    logger.info('라우터에 의해서 동작');
    res.json({
        success: true,
    });
});

// 애플리케이션 미들웨어가 처리하고 다음 미들웨어가 이어서 처리
app.get('/test', (req, res, next) => {
    logger.info('>> /test 첫번째 미들웨어 동작');
    next();
}, (req, res, next) => {
    logger.info('>> /test 두번째 미들웨어 동작');
    res.json({
        result: true
    });
});

// '/auth'로 시작하는 경로를 분리
app.use('/auth', require('./config/auth')(router));
app.use('/api/v1', require('./config/api/v1/user')(router));

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});

grpc_server.start();