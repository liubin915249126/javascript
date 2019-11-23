#### reduce

```js
Array.prototype.myReduce = function(f, value = 0) {
  for (let i = 0; i < this.length; i++) {
    value = f(this[i], value);
  }
  return value;
};
```
