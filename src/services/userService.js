import Logger from '../loaders/logger';
import testModel from "../models/testModel";

export default {
    signUp(user) {
        Logger.info(" >>> UserModel.create(user) 호출");

        user = {
            id: 'dslee03',
            name: "이동석",
        };
        return {user};
    },
    login(user) {
        Logger.info(" >>> 로그인 처리 서비스 호출");
        return {user};
    }
}