let a = 3;
function func(a) {
  a = 10; // 函数参数传值
  console.log(a); // 10
}
func();
console.log(a); // 3

// ["a","b","c","d"] => {a: {b: {c: {d: null}}}}
const genObj = (arr)=>{
    let temp = null;
    arr.reverse().forEach((item,index)=>{
       temp = {
           [item]: temp
       }
    })
    return temp;
}
console.log(
    JSON.stringify(
        genObj(["a","b","c","d"])
    )
)