/**
 * async/await를 사용한 비동기 함수 처리
 */

const promiseFunc = (index, timer, occurError) => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(`>> ${index} execute..`);
        if (occurError) {
            reject(new Error(`>> ${index} error..`));
        }
        resolve(true);
    }, timer);
});

const main = async() => {
    try {
        await promiseFunc(1, 1000);
        await promiseFunc(2, 2000);
        await promiseFunc(3, 3000, false);
    } catch (err) {
        console.error(err);
    }
}

main();