import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import Logger from '../../loaders/logger';
import middlewares from '../middlewares';
import {user, userSave} from '../middlewares/validatorSchema/user';
import joi from '../../utils/joiValidator';
import {sign, verify, refresh} from '../../utils/jwt';
import userCont from '../controller/userCont';

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
}

const route = Router();

export default (app = Router) => {
    Logger.info("/api/users route 진입");
    app.use('/users', route);

    // 미들웨어가 1개인 router
    route.get('/me', middlewares.func1, (req, res) => {
        Logger.info("/api/users/me 처리 완료");
        return res.json({ user: 'test' }).status(200);
    });

    // 미들웨어가 2개인 router
    route.get('/you', middlewares.func1, middlewares.func2, (req, res) => {
        Logger.info("/api/users/you 처리 완료");
        return res.json({ user: 'test', id: req.query.id }).status(200);
    });

    // validation 미들웨어 추가
    route.post('/', joi.validator.query(userSave), (req, res) => {
        // service layer
        const {user} = userService.signUp({});

        // response
        res.json({
            "result": true,
            user
        })
    });

    route.post('/test', joi.validator.query(user), (req, res) => {
        const {user} = userService.login({});
        res.json({
            "result": true,
            user
        });
    });

    // app.use(express.json())이 없으면 req.body를 제대로 처리하지 못한다.
    route.post('/post-test', (req, res) => {
        Logger.info(req.body);
        res.json(req.body);
    });

    //===================== JWT 회원가입&로그인 =======================
    route.post('/join', async (req, res) => {
        const {id, password, url} = req.body;
        Logger.info(`id:${id}, password:${password}`);

        const uesr = {};
        if (true) {
            const hashed = await bcrypt.hash(password, 10); // 패스워드 암호화
            // const newUser = {
            //     id, password: hashed, url
            // };
            //const newUserToken = sign(newUser);

            return res.status(200).json({
                msg: "회원가입 성공"
            });

        } else {//이미 가입된 정보가 존재할때 (msg)
            return res.status(400).json({msg : '이미 같은 아이디가 존재합니다'});
        }
    });

    /**
     * 로그인 처리
     * access token, refresh token을 전달
     */
    route.post('/login', async (req, res) => {
        const fixUser = {
            id: 'dslee03',
            password: '$2b$10$rBCnG70TWSjbY.2NnRHvv.qACjIcPTsfonsL5Fqpy8WLp5LwFVlk2'
        };

        const {id, password} = req.body;
        Logger.info(`${id}, ${password}`);

        // password 확인
        const isEquals = await bcrypt.compare(password, fixUser.password);
        if (isEquals) {
            // 토큰 발급
            const newToken = sign({id});
            const newRefreshToken = refresh();

            return res.status(200).json({
                result: true,
                access_token: newToken,
                refresh_token: newRefreshToken
            });

        } else {
            return res.status(400).json({msg: '회원 정보가 일치하지 않습니다.'});
        }
    });

    /**
     * JWT 토큰 검증
     */
    route.post('/jwt-token-verify', middlewares.authJwt, async (req, res) => {
        res.status(200).json({
            result: true,
            message: "jwt token 검증 성공"
        });
    });

    /**
     * JWT 인증정보가 필요한 API
     */
    route.get('/need-jwt-auth', middlewares.authJwt, async (req, res) => {
        res.status(200).json({
            result: true,
            message: "응답 데이터..",
        });
    });

    /**
     * JWT 인증이 불필요한 API
     */
    route.get('/not-need-jwt-auth', wrapAsync(async (req, res) => userCont.getUser(req, res)));
}