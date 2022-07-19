function Permutation(s) {
    // write code here
    if(s.length===0){
        return 0
    }
    var res = []
    perm(s.split(''),0,s.length-1)
    return res.sort().length;
    function perm(arr, from, to) {
        if (from === to) {
            res.push(arr.join(''))
            return;
        }
        for (var i = from; i <=to; i++) {
            if (!isRepeat(arr, from, i)) {
                swap(arr, from, i)
                perm(arr, from + 1, to)
                swap(arr, from, i)
            }
        }
    }
    function isRepeat(list, from, to) {
        if (to > from) {
            for (var i = from; i < to; i++) {
                if (list[i] === list[to]) {
                    return true;
                }
            }
        }
        return false;
    }
    function swap(list, m, n) {
        var temp = list[m];
        list[m] = list[n];
        list[n] = temp;
    }
}
