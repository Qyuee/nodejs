const grpc_client = require('./grpc_client');
const _ = require('lodash');

function serverStreaming() {
    let employeeIdList = [1,10,2];
    let call = grpc_client.employeeClient.paySalary({employeeIdList: employeeIdList});

    call.on('data',function(response){
        console.log(response.message);
    });

    call.on('end',function(){
        console.log('All Salaries have been paid');
    });
}

function clientStreaming() {
    let call = grpc_client.employeeClient.generateReport(function (error, response) {
        console.log("Reports successfully generated for: ", response.successfulReports);
        console.log("Reports failed since Following Employee Id's do not exist: ", response.failedReports);
    });

    let employeeIdList = [1, 10, 2];
    _.each(employeeIdList, function (employeeId) {
        call.write({ id: employeeId });
    })

    call.end();
}

serverStreaming();
//clientStreaming();
