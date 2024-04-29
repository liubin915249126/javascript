// Given an integer x, return true if x is a palindrome
// , and false otherwise.

// X = 121 =>true
// -1 => false
// 10 => false, 
// 11 => true

// tenet
const test = (int) =>{
    const str = String(int)
    let i=0
    while (i < (str.length-1)/2){
        if (str[i] !== str[str.length - 1 - i]){
            return false
        }
        i++;
    }
    return true
}

test(1111)

//  ktx SIG Alphamesh
//  https://app.ktx.finance/trade