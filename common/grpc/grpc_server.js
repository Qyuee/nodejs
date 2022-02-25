const grpc = require('@grpc/grpc-js');
const protos = require("./protos");
const helloMethod = require("./grpc_method/hello");
const test = require("./grpc_method/employee");

const server = new grpc.Server();

// gRPC 서비스 추가
const _setGrpcService = () => {
    // Unary grpc
    server.addService(protos.hello.Greeter.service, helloMethod.Greeter);
    server.addService(protos.hello.GoodBye.service, helloMethod.GoodBye);

    // Server/Client streaming grpc
    server.addService(protos.employee.Employee.service, test);
};

module.exports = {
    start: () => {
        // gRPC 서버 시작
        _setGrpcService();
        server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
            server.start();
        });
    }
};