## express middleware

##### 用法
```js
var express = require('express');
var app = express();
app.listen(3000, function () {
    console.log('listen 3000...');
});

app.use(middlewareA);
app.use(middlewareB);
app.use(middlewareC);
```