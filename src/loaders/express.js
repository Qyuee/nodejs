import express from 'express';
import config from '../config';
import route from '../api';
import { CustomError } from "../error/customError";
import errorHandler from "../errorHandler/errorHandler";
import apiErrorHandler from "../errorHandler/apiErrorHandler";
import cors from "cors";

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
}

export default (app) => {
    app.get('/status', (req, res) => {
        res.json({
            "text": "helloworld"
        });
        res.status(200).end();
    });

    app.get('/error', (req, res, next) => {
         throw new Error("woops");
    });

    // 비동기 오류 - 실패 케이스
    app.get('/error-async', (req, res, next) => {
        setImmediate(() => {
            throw new Error("woops - async");
        });
    });

    // 비동기 오류 - 성공 케이스
    // next()를 사용하여 비동기 오류를 오류처리기에게 전달해야한다.
    app.get('/error-async-success', (req, res, next) => {
        setImmediate(() => {
            next(new Error("woops - async - success"));
        });
    });

    // async/await와 함께 사용하기
    // 정상적인 오류 처리가 불가능하다.
    // 별도의 헬퍼 함수를 작성하여 오류처리 미들웨어에서 사용하도록 한다.
    app.get('/async-await-error', (req, res, next) => {
        return new Promise((resolve, reject) => {
            setImmediate(() => reject(new Error("woops - async/await")));
        });
    });

    // wrap 함수를 사용하여 비동기 에러를 처리 할 수 있다.
    app.get('/async-await-error-success', wrapAsync(async (req, res) => {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
        throw new Error('woops - async/await success');
    }));

    app.get('/apiError', wrapAsync(async (req, res) => {
        throw new CustomError('api error', 404, "/apiError message");
    }));

    app.get('/apiError2', wrapAsync(async (req, res) => {
        throw new CustomError('api error', 400, "/apiError2 message");
    }));

    // cors 설정
    // 특별한 설정이 없다면, 모든 도메인에서 해당 서버에 제한 없이 요청을 보내고 응답 받을 수 있다.
    const corsOptions = {
        origin: 'https://localhost:8080',
        credential: true,
    };
    app.use(cors(corsOptions));

    // json으로 구성된 request body를 처리하기 위해서 모듈 추가
    app.use(express.json());

    // express에 내장된 미들웨어, urlencoded 페이로드를 req.body에 포함시켜준다.
    // extended: 중첩객체를 허용 할지 말지 결정한다.
    // true인 경우: person[name]=dslee03&person[age]=10 => { person: { name: 'dslee03', age: 10}}
    // false인 경우: person[name]=dslee03&person[age]=10 => { person[name]: 'dslee03', person[age]: 10 }
    app.use(express.urlencoded({extended: false}));

    // API
    app.use(config.api.prefix, route());

    // 에러처리
    app.use(apiErrorHandler);
    app.use(errorHandler);
};

