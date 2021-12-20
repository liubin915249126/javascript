
// 循环引用定义为对象的地址和源的地址相同
// 判断对象与源是否相等即可
// 但是对象中会嵌套对象，源的数量不只一个，即不只外层对象，还有可能是外层对象的外层对象等，因此需要递归判断每个对象中的属性，并传递一个源的数组。
function hasLoop(obj){
	// 判断对象内部是否有和源相同的属性
	function findLoop(target, src){
		// 源数组，并将自身传入
		const source = src.slice().concat([target])
		
		for(const key in target){
			// 如果是对象才需要判断
			if(typeof target[key] === 'object'){
				// 如果在源数组中找到 || 递归查找内部属性找到相同
				if(source.indexOf(target[key]) > -1 || findLoop(target[key], source)){
					return true
				}
			}
		}
		return false
	}
	// 如果传入值是对象，则执行判断，否则返回false
	return typeof obj === 'object' ? findLoop(obj, []) : false
}

// 对象的值等于父级(祖父级，曾祖父级....),则说明是循环引用了
// var c = JSON.decycle(a)和var a = JSON.retrocycle(c)
function cycle(obj, parent) {
    //表示调用的父级数组
    var parentArr = parent || [obj];
    for (var i in obj) {
        if (typeof obj[i] === "object") {
            //判断是否有循环引用
            parentArr.forEach((pObj) => {
                if (pObj === obj[i]) {
                    obj[i] = "[cycle]"
                }
            });
            cycle(obj[i], [...parentArr, obj[i]])
        }
    }
    return obj;
}
