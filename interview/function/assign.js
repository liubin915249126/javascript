const iAssign = function (target, ...source) {
    if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    let res = Object(target);
    for (let i = 0; i < source.length; i++) {
        let src = source[i];
        let keys = [...Object.keys(src), ...Object.getOwnPropertySymbols(src)];
        for (const k of keys) {
            if (src.propertyIsEnumerable(k)) {
                res[k] = src[k];
            }
        }
    }
    return res;
};
// 保持 assign 的数据属性一致
Object.defineProperty(Object, 'iAssign', {
    value: iAssign,
    configurable: true,
    enumerable: false,
    writable: true
});
