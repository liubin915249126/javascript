Promise.allSettled([
    Promise.resolve(3),
    Promise.reject(4),
]).then(res=>{
    console.log(111, res)
})

Promise.all([
    Promise.resolve(3),
    // Promise.reject(4),
]).then(res=>{
    console.log(222, res)
}).catch((err)=>{
    console.log(222, err)
})