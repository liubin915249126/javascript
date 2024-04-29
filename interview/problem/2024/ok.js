// function  A() {
//     const config = {
//         name: 'ngnice'
//     }
//     const fullname = useMemo(()=> {
//         return config.name + 'alo';
//     }, [config])

//     return ...
// }


const name = "global";
function outer() {
	let name =  'outer';
	var obj={
	    name:"aaa",
	    log: ()=>{ 
	        console.log(this.name);
	    }
	}
	obj.log();
}
outer()

Promise.allSettled = (arr)=>{
    const res = []
    return new Promise((resolve) =>
    {
        let i = 0;
        while (i < arr.length){
            arr[i].then((res) =>
            {
                res[i] = {
                    data: res,
                    success: true
                }
            }).catch((error) =>
            {
                res[i] = {
                    error,
                    success: false
                }
            }).finally(() =>{
                if (res.length === arr.length)
                {
                    resolve(res)
                }
            })
            i = i + 1
        }
    })
}