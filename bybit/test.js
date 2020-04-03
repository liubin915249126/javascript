const test = () =>{
    new Promise(resolve=>{
        resolve()
    }).then(()=>{console.log(111)})
    console.log(aaa())
}
test();