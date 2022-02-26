/**
 * @grpc/grpc-js을 활용한 grpc client 구성
 */
require('dotenv').config();
const grpc = require('@grpc/grpc-js');
const protos = require('../protos');

// grpc client 옵션
const grpcClientOptions = {
    'grpc.min_reconnect_backoff_ms': 100,
    'hello': 1000
};

// gRPC 클라이언트 생성
// serviceUrl은 글로벌 옵션으로 분리
const helloClient = new protos.hello.Greeter(global.GRPC_SERVER_URL, grpc.credentials.createInsecure(), grpcClientOptions);
const byeClient = new protos.hello.GoodBye(global.GRPC_SERVER_URL, grpc.credentials.createInsecure(), grpcClientOptions);
const employeeClient = new protos.employee.Employee(global.GRPC_SERVER_URL, grpc.credentials.createInsecure(), grpcClientOptions);

const test = grpc.getClientChannel(helloClient);
//console.log(test);

module.exports = {
    helloClient,
    byeClient,
    employeeClient
};