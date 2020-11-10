## 类型转换

### 基本类型转换

#### 原始值转布尔
其他全为 true
```js
    console.log(Boolean()) // false
    console.log(Boolean(false)) // false
    console.log(Boolean(undefined)) // false
    console.log(Boolean(null)) // false
    console.log(Boolean(+0)) // false
    console.log(Boolean(-0)) // false
    console.log(Boolean(NaN)) // false
    console.log(Boolean("")) // false
```
#### 原始值转数字
我们可以使用 Number 函数将类型转换成数字类型，如果参数无法被转换为数字，则返回 NaN。
如果 Number 函数不传参数，返回 +0，如果有参数，调用 ToNumber(value)

Undefined	NaN
Null	+0
Boolean	如果参数是 true，返回 1。参数为 false，返回 +0
Number	返回与之相等的值
String	这段比较复杂，看例子

```js
    console.log(Number("")) // 0
    console.log(Number(" ")) // 0

    console.log(Number("123 123")) // NaN
    console.log(Number("foo")) // NaN
    console.log(Number("100a")) // NaN
```

如果通过 Number 转换函数传入一个字符串，它会试图将其转换成一个整数或浮点数，而且会忽略所有前导的 0，如果有一个字符不是数字，结果都会返回 NaN，鉴于这种严格的判断，我们一般还会使用更加灵活的 parseInt 和 parseFloat 进行转换。
parseInt 只解析整数，parseFloat 则可以解析整数和浮点数，如果字符串前缀是 "0x" 或者"0X"，parseInt 将其解释为十六进制数，parseInt 和 parseFloat 都会跳过任意数量的前导空格，尽可能解析更多数值字符，并忽略后面的内容。如果第一个非空格字符是非法的数字直接量，将最终返回 NaN：
```js
    console.log(parseInt("3 abc")) // 3
    console.log(parseFloat("3.14 abc")) // 3.14
    console.log(parseInt("-12.34")) // -12
    console.log(parseInt("0xFF")) // 255
    console.log(parseFloat(".1")) // 0.1
    console.log(parseInt("0.1")) // 0
```

#### 原始值转字符串
String 函数不传参数，返回空字符串，如果有参数，调用 ToString(value)，而 ToString 也给了一个对应的结果表。表如下：
Undefined	"undefined"
Null	"null"
Boolean	如果参数是 true，返回 "true"。参数为 false，返回 "false"
Number	又是比较复杂，可以看例子
String	返回与之相等的值

```js
    console.log(String(0)) // 0
    console.log(String(-0)) // 0
    console.log(String(NaN)) // NaN
    console.log(String(Infinity)) // Infinity
    console.log(String(-Infinity)) // -Infinity
    console.log(String(1)) // 1
```


[参考文献](https://github.com/mqyqingfeng/Blog/issues/164)