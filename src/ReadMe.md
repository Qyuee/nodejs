### 계층설계
- 관심사 분리 원칙을 위해서 API Route와 비즈니스 로직을 분리한다.
- 비즈니스 로직과 Data Access Layer는 분리한다.
- Controller <-> Service Layer <-> Data Access Layer로 구분


### 설정파일
- dotenv를 통해서 API KEY혹은 DB연결 정보를 저장한다.
- dotenv는 .env파일을 로그하여 process.env 객체에 대입해준다.


### Loader
- node.js 서비스 시작 프로세스를 테스트 가능한 모듈로 나눈다.
- 지저분한 app.js를 정리 할 수 있고, 모듈별로 테스트 할 수 있다.