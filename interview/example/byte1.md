#### options请求是什么？有什么作用？
#### cdn的原理是什么，是在网络哪一层起的作用？
#### setTimeout为什么最小只能设置4ms，怎么实现一个0ms的setTimeout?
#### xss和csrf
#### http2
#### Tree Shaking原理
#### 实现 immutable
```js
function immutable(obj) {
  return {
    set(path, val) {
      const paths = path.split('.')
      const lastK = paths.pop()
      this.get(paths.join('.'))[lastK] = val
      return this
    },
    get(path) {
      const paths = path.split('.')
      return paths.reduce((a, k) => a[k], obj)
    }
  }
}
```

suchangv@bytedance.com suchangvv
[referer](https://juejin.cn/post/6985884324037918733)
