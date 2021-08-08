// 给你一个“A2B3”这样的字符串，输出“AABBB”


const repeatStr = (str)=>{
   const arr = str?.split('');
   for(let i = arr.length; i--; i>0){
      if(/\d/.test(arr[i])){
        arr.splice(i,1, arr[i-1].repeat(arr[i]-1))    
      }
   }
   return arr.join('')
}

console.log(11, repeatStr('A2B3'))