## 

```js
//js实现大数相加
        function add(str1, str2) {

            if (Number(str1) > Number(str2)) {
                var len = str1;
            } else {
                var len = str2;
            }

            var len1 = str1.length;
            var len2 = str2.length;
            var temp = 0;
            var total = [];

            for (let i = 0; i < len.length; i++) {
                temp += Number(str1.charAt(len1 - i - 1)) + Number(str2.charAt(len2 - i - 1));
                if (temp > 9) {
                    // 如果两数相加大于9，则把余数放进total
                    // temp=1 跟下一对相加
                    total.unshift(temp % 10);
                    temp = 1;
                } else {
                    // 如果两数相加小于10，则把余数直接放进total
                    total.unshift(temp);
                    temp = 0;
                }
            }
            total = total.join("");
            return total
        }
        document.write(add(
            "123456789123456789123456789123456789123456789123456734",
            "1241519123456789123456789123456789123456789123456789123451234567891"
        ));
```