#### axios 跨域
现象：XMLHttpRequest cannot load xxxxxxxx. Request header field Content-Type is not allowed by Access-Control-Allow-Headers in preflight response.
>
  不是application/x-www-form-urlencoded，multipart/form-data 或 text/plain 这三者的话，便会触发 OPTIONS 请求
>
>
Access-Control-Max-Age这个响应首部表示 preflight request  （预检请求）的返回结果（即 Access-Control-Allow-Methods 和Access-Control-Allow-Headers 提供的信息） 可以被缓存的最长时间，单位是秒。(MDN)
>
解决办法
```
    var params = new URLSearchParams();
    params.append('param1', 'value1');
    params.append('param2', 'value2');
    axios.post('/foo', params);
```
```
   var qs = require('qs');
   axios.post('/foo', qs.stringify({ 'bar': 123 }));
   
```