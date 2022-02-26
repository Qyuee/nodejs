import connection from '../loaders/mysql';
import {CustomError} from "../error/customError";

// callback 안됨
const test = async () => {
    await connection.query('select * from admin', (error, rows, fields) => {
        if (error) {
            throw new CustomError('db error', 500, error.message);
        }

        //console.log(rows);
        return rows;
    });
};

// promise를 사용하여 콜백
const test2 = () => new Promise(async (resolve, reject) => {
    await connection.query('select * from admin where admin_no = 10', (error, rows) => {
        if (error) {
            //reject(new CustomError('db error', 500, error.message));
            reject(error);
        }
        resolve(rows);
    });
});

module.exports = {
    test,
    test2
}