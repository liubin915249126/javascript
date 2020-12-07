var a = '11'

const obj = {
    a:111,
    b(){
        console.log(111,this.a)
    },
    c:()=>{
        console.log(222,this.a)
    }
};

obj.b()
obj.c()