const http = require('http');

const get_http_client = (url, method) => {
    const options = {
        method,
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        }
    };

    const req = http.request(url, options, (res) => {
        res.on('end', (responseData) => {
            console.log(`response data : ${responseData}`);
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    req.end();
};

module.exports = {
    get_http_client
};