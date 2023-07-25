## 错误捕获

#### 错误类型

```
JS 代码运行错误、语法错误等
异步错误等
静态资源加载错误
接口请求报错
```

#### try/catch

只能捕获代码常规的运行错误，语法错误和异步错误不能捕获到

```js
// 示例1：常规运行时错误，可以捕获 ✅
 try {
   let a = undefined;
   if (a.length) {
     console.log('111');
   }
 } catch (e) {
   console.log('捕获到异常：', e);
}

// 示例2：语法错误，不能捕获 ❌
try {
  const notdefined,
} catch(e) {
  console.log('捕获不到异常：', 'Uncaught SyntaxError');
}

// 示例3：异步错误，不能捕获 ❌
try {
  setTimeout(() => {
    console.log(notdefined);
  }, 0)
} catch(e) {
  console.log('捕获不到异常：', 'Uncaught ReferenceError');
}
```

#### window.onerror

window.onerror 可以捕获常规错误、异步错误，但不能捕获资源错误, 语法错误，不能捕获

```js
/**
 * @param { string } message 错误信息
 * @param { string } source 发生错误的脚本URL
 * @param { number } lineno 发生错误的行号
 * @param { number } colno 发生错误的列号
 * @param { object } error Error对象
 */
window.onerror = function (message, source, lineno, colno, error) {
  console.log('捕获到的错误信息是：', message, source, lineno, colno, error)
}
```

#### window.addEventListener

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
</head>
<script>
  window.addEventListener('error', (error) => {
    console.log('捕获到异常：', error);
  }, true)
</script>

<!-- 图片、script、css加载错误，都能被捕获 ✅ -->
<img src="https://test.cn/×××.png">
<script src="https://test.cn/×××.js"></script>
<link href="https://test.cn/×××.css" rel="stylesheet" />

<script>
  // new Image错误，不能捕获 ❌
  // new Image运用的比较少，可以自己对创建的图片使用 onerror 事件单独处理  let img = new Image();
  img.src = 'https://test.cn/×××.png'
    img.onerror = () => {          };
</script>
</html>
```

#### Promise 错误

Promise 中抛出的错误，无法被 window.onerror、try/catch、 error 事件捕获到，可通过 unhandledrejection 事件来处理

```js
try {
  new Promise((resolve, reject) => {
    JSON.parse('')
    resolve()
  })
} catch (err) {
  // try/catch 不能捕获Promise中错误 ❌
  console.error('in try catch', err)
}

// error事件 不能捕获Promise中错误 ❌
window.addEventListener(
  'error',
  (error) => {
    console.log('捕获到异常：', error)
  },
  true
)

// window.onerror 不能捕获Promise中错误 ❌
window.onerror = function (message, source, lineno, colno, error) {
  console.log('捕获到异常：', { message, source, lineno, colno, error })
}

// unhandledrejection 可以捕获Promise中的错误 ✅
window.addEventListener('unhandledrejection', function (e) {
  console.log('捕获到异常', e)
  // preventDefault阻止传播，不会在控制台打印
  e.preventDefault()
})
```

#### React

componentDidCatch

#### 跨域资源 Script error

后端配置 Access-Control-Allow-Origin、前端 script 加 crossorigin
调用方法 try catch 包裹
