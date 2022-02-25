'use strict'

global.ROOT_PATH = require('app-root-path').path;
global.COMMON_PATH = ROOT_PATH + '/common';

const HELLO_PROTO_PATH = COMMON_PATH + '/grpc/protos/helloworld.proto';
const EMPLOYEE_PROTO_PATH = COMMON_PATH + '/grpc/protos/employee.proto';

global.PROTO_PATH_LIST = [
    HELLO_PROTO_PATH,
    EMPLOYEE_PROTO_PATH
];

global.GRPC_SERVER_URL = "localhost:50051";