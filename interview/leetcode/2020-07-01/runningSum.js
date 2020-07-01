var runningSum = (nums)=>{
    const result = [];
    let temp = 0;
    for (let i = 0; i <nums.length; i++){
        temp += nums[i];
        result.push(temp);
    }
    return result
}

var runningSum = (nums)=>{
    const result = [];
    let temp = 0;
    nums.reduce((prev, current)=>{
        result.push(prev)
        return prev + current;
    },nums[0])
    return result
}

console.log(runningSum([1,2,3,4,5,6]))