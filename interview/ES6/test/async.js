const delay = (time) =>{
    return new Promise((resolve, reject) =>{
        setTimeout(resolve,time)
    })
}



const test = async () => {
    try {
       const res = await delay(100);
       console.log('success',res)
    }catch(err){
       console.log(111,error); 
    }
    console.log('finally')
}


const test1 = async () => {
    delay(100).then((res)=>{
        console.log('success',res)
    }).catch((err)=>{
        console.log(111,err); 
    }).finally(()=>{
        console.log('finally')
    })
    console.log('out')
}

test()