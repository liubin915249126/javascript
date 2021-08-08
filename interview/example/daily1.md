## 计算机基础
#### 如何列出所有已合并到 master 的分支并删除
```sh
# 列出所有已合并到 master 的分支
$ git branch --merged master
# 删除所有已合并到 master 的分支
$ git branch --merged master | grep -v '^\*' | xargs git branch -d
```

#### http 状态码中 301，302和307有什么区别
301，Moved Permanently。永久重定向，该操作比较危险，需要谨慎操作：如果设置了301，但是一段时间后又想取消，但是浏览器中已经有了缓存，还是会重定向。
302，Found。临时重定向，但是会在重定向的时候改变 method: 把 POST 改成 GET，于是有了 307
307，Temporary Redirect。临时重定向，在重定向时不会改变 method