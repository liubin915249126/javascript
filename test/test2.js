
var isValid = function(s){
    let temp={
        '(':')',
        '{':'}',
        '[':']'
    }
    let res = [];
    for(let i=0; i<s.length; i++){
        if(temp[s[i]]){
            res.push(s[i])
        }else{
            if(temp[res.pop()] != s[i]) return false
        }
    }
    return res.length===0
};

console.log(isValid('( [ ) ]'))

// 数组数字相加 等于 n