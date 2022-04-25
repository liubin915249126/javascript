function maxLengthBetweenEqualCharacters( s ) {
    // write code here
    const arr = s.split('');
    const res = {};
    for(let i = 0; i<arr.length; i++){
       for(let j = i+1; j<arr.length; j++){
         res[i] = -1
         if(arr[i] === arr[j]){
           res[i] = j - i - 1
         }
      } 
    }
    console.log(111,res)
    return Math.max(...Object.values(res)) 
}

maxLengthBetweenEqualCharacters("cc")