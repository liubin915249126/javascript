async function test(){
    await console.log(1)
    setTimeout(()=>console.log(2),0)
    new Promise((resolve)=>{
        console.log(3)
        // resolve()
        setTimeout(()=>resolve(),0)
    }).then(()=>{console.log(4)})
    console.log(5)
}
test() 