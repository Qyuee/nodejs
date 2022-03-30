
const promiseFunc = (index, timer, occurError) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (occurError) {
            reject(new Error(">> promise001 Error.."));
        }
        console.log(`>> ${index} execute.. timer: ${timer}`);
        resolve(true);
    }, timer);
});

const main = async () => {
    Promise.all([
        await promiseFunc(1, 1000, false),
        await promiseFunc(2, 2000, false),
        await promiseFunc(3, 3000, false)
    ]).then((result) => {
        console.log(result);
    });
}

main();