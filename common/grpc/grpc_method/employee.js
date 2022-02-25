let { employees } = require('../protos/data.js');
const _ = require('lodash');

module.exports = {
    paySalary : (call) => {
        let employeeIdList = call.request.employeeIdList;

        _.each(employeeIdList, function (employeeId) {
            let employee = _.find(employees, { id: employeeId });
            if (employee != null) {
                let responseMessage = "Salary paid for ".concat(
                    employee.firstName,
                    ", ",
                    employee.lastName);

                call.write({ message: responseMessage });
            }
            else{
                call.write({message: "Employee with Id " + employeeId + " not found in record"});
            }

        });
        call.end();
    },
    generateReport: (call, callback) => {
        let successfulReports = [];
        let failedReports = [];

        // 메세지를 스트림으로 수신
        call.on('data',function(employeeStream){
            let employeeId = employeeStream.id;
            let employee = _.find(employees, { id: employeeId });
            if (employee != null) {
                successfulReports.push(employee.firstName);
            }
            else{
                failedReports.push(employeeId);
            }

        });

        // 단일 메세지로 응답
        call.on('end',function(){
            callback(null,{
                successfulReports: successfulReports.join(),
                failedReports: failedReports.join()
            })
        })
    }
}