import mysql from 'mysql';

// 일반적인 Connection 생성
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'practice_project'
});

// Connection Pool 방식
const connectionPool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'practice_project',
    connectionLimit: 10
});

const getConnection = (callback) => {
    connectionPool.getConnection((err, conn) => {
        if (! err) {
            callback(conn);
        }
    });
};

setInterval(() => {
    console.log("\n====================DB connection status=======================");
    console.log(`connection Pool 총 개수: ${connectionPool.config.connectionLimit}`);
    console.log(`connection Pool 유휴 개수: ${connectionPool._freeConnections.length}`);
    console.log(`사용 중인 연결을 포함하여 현재 생성된 연결 수: ${connectionPool._allConnections.length}`);
    console.log(`획득 프로세스 중 연결 수: ${connectionPool._acquiringConnections.length}`);
    console.log("=================================================================\n");

}, 1000);

connectionPool.on('release', (connection) => {
    console.log('Connection %d released', connection.threadId);
});

module.exports = getConnection;