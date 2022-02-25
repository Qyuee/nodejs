// Importing the async module
const async = require('async');
const objectSearch = require('object-search');

// 몰 리스트
const malls = ['first', 'second', 'first', 'first'];
const queues = {};
const tasks = [1, 2, 3, 4, 5, 6, 7, 8];

malls.forEach(mall => {
    queues[mall] = async.queue((task, cb) => {
        setTimeout(() => {
            cb(task, queues[mall].length());
        }, 1000);
    }, 1);

    queues[mall].drain(() => {

    });
});

console.log(Object.keys(queues).length);

tasks.forEach(number => {
    //console.log(queues);

    if (number % 2 === 0) {
        queues['first'].push({'worker': 'first', 'data': number}, (task, remaining) => {
            console.log(`${task.worker} was done [${task.data}]. remaining: ${remaining}`);
        });
    } else {
        queues['second'].push({'worker': 'second', 'data': number}, (task, remaining) => {
            console.log(`${task.worker} was done [${task.data}]. remaining: ${remaining}`);
        });
    }
});