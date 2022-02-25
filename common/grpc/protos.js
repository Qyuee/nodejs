const logger = require('pino')();
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
require('../configs/config');

const packageDefinition = protoLoader.loadSync(
    global.PROTO_PATH_LIST,
    {
        keepCase: true, // camel 케이스로 필드명이 변경됨
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });

const proto = grpc.loadPackageDefinition(packageDefinition);
//console.log(proto);

module.exports = {
    // unary
    hello: proto.helloworld,

    // Server/Client streaming
    employee: proto.employee,
}