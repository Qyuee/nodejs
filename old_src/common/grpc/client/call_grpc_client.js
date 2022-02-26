const grpc_client = require('./grpc_client');

grpc_client.helloClient.getUserInfo(
    {
        id_here: 'tester',
        age_kr: 1000,
        something: ['test', 'test1', 'test2']
    }, (error, result) => {
        console.log(result);
        console.log(result.map_obj[0]);
    });

grpc_client.byeClient.sayBye(
    {
        name: '이동석',
    }, (error, result) => {
        console.log(result);
    }
)

setTimeout(() => {
    grpc_client.helloClient.sayHello(
    {
        name: 'dslee03'
    }, (error, result) => {
        console.log(result);
    });

    console.log(grpc_client.helloClient);

    // client의 종료가 적절히 있어야 "close_wait" 상태 소켓을 방지 할 수 있다.
    grpc_client.helloClient.close();
    grpc_client.byeClient.close();

    setTimeout(() => {
        process.exit();
    }, 3000);

    //console.log(`connectivityState: ${grpc_client.helloClient}`);
}, 5000);

// @Todo: gRPC 서버가 예기치않은 사유로 종료되었을 때, client가 재접속 할 수 있는 방법 필요
// 커넥션이 끊겨버렸을 때, -> health check?

