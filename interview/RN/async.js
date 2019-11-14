function timer(time) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('relsult')
        },time)
    })
}
async function test(){
    let result = await timer(2);
    console.log(result)
    console.log(333)
}
test().then(() => {
    console.log(444)
});