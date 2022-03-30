import express from 'express';
import config from './config';
import Logger from './loaders/logger';

async function startServer() {
    const app = express();
    //require('./loaders/express').default(app);
    await require('./loaders').default({expressApp : app});

    app.listen(config.port, () => {
        Logger.info(`
          ################################################
          🛡️  Server listening on port: ${config.port} 🛡️
          ################################################
        `);
    }).on('error', err => {
        Logger.error(err);
        process.exit(1);
    });
}

/**
 * process 객체의 .on을 사용하여 'uncaughtException' 이벤트 리스너를 추가한다.
 * 처리하지 못한 에러가 있는 경우 이벤트 리스너가 실행되고 프로세스가 유진 될 수 있다.
 * 권장하는 방식은 아니고 최후의 수단으로 생각 할 것.
 * 최대한 비동기 에러를 처리 할 수 있도록 프로그램을 작성하는게 좋다.
 */
process.on('uncaughtException', (err) =>{
    console.error('예기치 못한 에러(uncaughtException)', err);
    // 서버를 복구하는 코드는 권장사항이 아님.
    // uncaughtException 가 콜백이 실행되는 것을 보장하지 않기 때문.
    // 복구 코드를 콜백에 지정하여도 그 실행을 장담 할 수 없다.
})

startServer();