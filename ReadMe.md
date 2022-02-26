### Todo
- gRPC reconnection은 어떻게 되는가?
  - backoff에 따라서 자동으로 동작한다고함
  - https://github.com/grpc/grpc-node/issues/1591
- gRPC를 테스트 할 수 있는 방법
- 배포등의 사유로 연결중이던 grpc 통신이 완료된 후, 처리가능?
  - 이건 pm2 SIGINT를 통해서 가능 할 듯?

### 실행커맨드
> 디버깅 mode
>> GRPC_VERBOSITY=DEBUG GRPC_TRACE=all node --inspect ./common/grpc/client/call_grpc_client.js

### Building High Performance gRPC Node.JS Framework
> https://anderson-3395.medium.com/grpc-node-js-framework-composition-7afd9b1c5aae