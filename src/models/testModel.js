import connection from '../loaders/mysql';
import {DbError} from '../error';

// callback 안됨
const test = async () => {
    await connection.query('select * from admin', (error, rows, fields) => {
        if (error) {
            throw new DbError('db error', 500, error.message);
        }
        return rows;
    });
};

// promise + connection pool + 성공 케이스
const successModel = () => new Promise((resolve, reject) => {
    connection((conn) => {
        conn.query('select * from admin', (err, rows) => {
            if (err) {
                //reject(err);
                reject(new DbError("db error", 500, err.message));
            }

            resolve(rows);
            conn.release();
        });
    });
});

// promise + connection pool + 실패 케이스
const failedModel = () => new Promise((resolve, reject) => {
    connection((conn) => {
        conn.query('select * from admin2', (err, rows) => {
            if (err) {
                reject(new DbError("db error", 500, err.message));
            }

            resolve(rows);
            conn.release();
        });
    });
});

module.exports = {
    test,
    successModel,
    failedModel
}