const http_client = require('./http_client');

const call = () => {
    const result = http_client.get_http_client('http://localhost:3000/api/v1/test01', "GET");
    console.log(result);
}

call();