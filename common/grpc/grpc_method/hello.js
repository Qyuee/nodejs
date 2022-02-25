/**
 * Implements the SayHello RPC method.
 * 서버측에서 응답해주는 gpc 메소드 명세
 */
module.exports = {
    Greeter: {
        sayHello: function(call, callback) {
            callback(null, {message: 'Hello ' + call.request.name});
        },
        getUserInfo: function(call, callback) {
            //console.log(call.request);
            callback(null, {
                id_here: call.request.id_here,
                name: "someone",
                age_kr: call.request.age_kr,
                points: 0.123,
                interests: ["tennis", "baseball"],
                something: call.request.something,
                map_obj: [{
                    name : "tester_map",
                    age: 2000
                }]
            });
        }
    },
    GoodBye: {
        sayBye: function(call, callback) {
            console.log(call.request);
            callback(null, {message: 'bye '+ call.request.name});
        }
    }
}