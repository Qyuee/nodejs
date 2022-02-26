import jwt from 'jsonwebtoken';
import Logger from "../loaders/logger";

// dotenv로 관리하고, secret key 자체는 암호화된 것으로 할 것.
const jwtSecret = "JsonWebTokenSecret";

module.exports = {
    // access token 발급
    sign(user) {
        const payload = {
            id: user.id,
            password: user.password,
        };

        return jwt.sign(payload, jwtSecret, {
            algorithm: 'HS256',
            expiresIn: '3m',
        });
    },

    // access token 검증
    verify(token) {
        let decoded = null;
        try {
            decoded = jwt.verify(token, jwtSecret);
            return {
                ok: true,
                id: decoded.id,
                password: decoded.password,
            };
        } catch (err) {
            throw err;
        }
    },

    // refresh token 발급
    refresh() {
        return jwt.sign({}, jwtSecret, {
            algorithm: 'HS256',
            expiresIn: '1h',
        }, {});
    },



}