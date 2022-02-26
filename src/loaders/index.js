import ExpressLoader from './express';
import Logger from './logger';

export default async ({expressApp: app}) => {
    await ExpressLoader(app);
    Logger.info("Express loaded");

    //Logger.info("Mysql loaded");
};
