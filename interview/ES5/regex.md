## 正则学习

#### 位置元字符
- ^
- $ 
- \b
  \b是单词边界，具体就是\w和\W之间的位置，也包括\w和^之间的位置，也包括\w和$之间的位置
  ```js
    var result = "[JS] Lesson_01.mp4".replace(/\b/g, '#');
    console.log(result); 
    // => "[#JS#] #Lesson_01#.#mp4#"
  ```

- \B
positive lookahead和negative lookahead
- 前瞻断言
    - (?=exp) 顺序肯定环视，表示所在位置右侧能够匹配exp
    - (?!exp) 顺序否定环视，表示所在位置右侧不能匹配exp
- 后瞻断言
    - (?<=exp) 逆序肯定环视，表示所在位置左侧能够匹配exp
    - (?<!exp) 逆序否定环视，表示所在位置左侧不能匹配exp
```js
   /(?!^)(?=(\d{3})+$)/g
   '12345678'.replace(/(?=(\d{3})+(?!\d))/g,",") // '12,345,678'
```



#### 特殊元字符
>
    \d：[0-9]，表示一位数字，记忆方式 digit
    \D：[^0-9]，表示一位非数字
    \s：[\t\v\n\r\f]，表示空白符，包括空格，水平制表符（\t），垂直制表符（\v），换行符（\n），回车符（\r），换页符（\f），记忆方式 space character
    \S：[^\t\v\n\r\f]，表示非空白符
    \w：[0-9a-zA-Z]，表示数字大小写字母和下划线，记忆方式 word
    \W：[^0-9a-zA-Z]，表示非单词字符
>

[参考](https://juejin.im/post/59b5e50f51882519777c4815)

#### api
```js
    var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
    var string = "2017-06-26";
    console.log( string.match(regex) );
    // =>["2017-06-26", "2017", "06", "26", index: 0, input: "2017-06-26"]
```
```js
    var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
    var string = "2017-06-26";
    console.log( regex.exec(string) );
    // =>["2017-06-26", "2017", "06", "26", index: 0, input: "2017-06-26"]

```