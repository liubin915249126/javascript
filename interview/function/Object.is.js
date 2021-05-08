const iIs = function (x, y) {
    if (x === y) {
        return x !== 0 || 1 / x === 1 / y;
    } else {
        return x !== x && y !== y;
    }
}
// 保持 is 的数据属性一致
Object.defineProperty(Function.prototype, 'iIs', {
    value: iIs,
    configurable: true,
    enumerable: false,
    writable: true
});
