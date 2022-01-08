function a(){
    console.log(111, this)
    let obj = {
        b:1,
        c:()=> {
            console.log(222, this)
        }
    }
    obj.c()
}

a()