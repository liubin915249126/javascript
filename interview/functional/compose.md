## compose

```js
function compose(...fns) {
    return function composed(result){
        // 拷贝一份保存函数的数组
        var list = fns.slice();

        while (list.length > 0) {
            // 将最后一个函数从列表尾部拿出
            // 并执行它
            result = list.pop()( result );
        }

        return result;
    };
}

// ES6 箭头函数形式写法
var compose =
    (...fns) =>
        result => {
            var list = fns.slice();

            while (list.length > 0) {
                // 将最后一个函数从列表尾部拿出
                // 并执行它
                result = list.pop()( result );
            }

            return result;
        };


```
#### example
```js
function uniqueWords(str) {
    return unique( words( str ) );
}
uniqueWords(text)
```

