#### forEach
数组的forEach 不能使用 break
return false 不能跳出循环
>
  - break 语句用于退出 switch 语句或循环语句(for, for ... in, while, do ... while)。
  - 当 break 语句用于 switch 语句中时，会跳出 switch 代码块，终止执行代码。
  - 当 break 语句用于循环语句时，会终止执行循环，并执行循环后代码(如果有的话)。
  - break 语句同样可用于可选的标签引用，用于跳出代码块。
  - 注意： break 语句（不带标签引用），只能用在循环或 switch 中。
>

#### js 标签 label
label:statement
eg:
```js
for(var i=0;i<itemsId.length;i++){
    outPoint:
    for(var j=0;j<all.length;j++){
        for(var k=0;k<all[j].length;k++){
            if( all[j][k].id == itemsId[i] ){
                console.log(all[j][k]);
                break outPoint;
            }
        }
    }
}
//这样，在all[j][k].id == itemsId[i]的时候，就会跳出到outPoint的位置，直接跳出两个循环，从下一个id开始查找。少循环了许多次。
```
#### 解决方案
- 数组的 some return true;
- 数组的 every return false;
- try{}catch(e){} throw new Error();
- 用 for 循环