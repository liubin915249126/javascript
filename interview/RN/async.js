function timer(time) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('relsult')
        },time)
    })
}
async function test(){
    let result = await timer(2000);
    console.log(result)
    console.log(333)
}
test().then(() => {
    console.log(444)
});
console.log(555)
// async function test() {
//     console.log(1)
//     // await Promise.resolve(console.log(2));
//     await console.log(2);
//     console.log(3)
// }
// test()
// console.log(4)