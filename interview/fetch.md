## fetch
#### abort timeout
```js
   var oldFetchfn = fetch;
    window.fetch = function(input, opts) {
        return new Promise(function(resolve, reject) {
            var abort_promise = function() {
                reject(new Error("fetch abort"));
            };
            var p = oldFetchfn(input, opts).then(resolve, reject);
            p.abort = abort_promise;
            return p;
        });
    }; 
```
```js
    var oldFetchfn = fetch; //拦截原始的fetch方法
    window.fetch = function(input, opts){//定义新的fetch方法，封装原有的fetch方法
        var fetchPromise = oldFetchfn(input, opts);
        var timeoutPromise = new Promise(function(resolve, reject){
            setTimeout(()=>{
                reject(new Error("fetch timeout"))
            }, opts.timeout)
        });
        retrun Promise.race([fetchPromise, timeoutPromise])
    }
```
