var name = 'outer'

const obj = {
    name: 'inner',
    get:function () {
        console.log(111,this,this.name)
    },
    get1() {
        console.log(111,this,this.name)
    },
    get2: ()=> {
        console.log(111,this,this.name)
    }
};
obj.get()
obj.get1()
obj.get2()
