#### 前序遍历

```js
// 前序遍历就是先访问根节点，然后递归地遍历左子树，最后递归地遍历右子树。
function preorderTraversal(node) {
  if (!node) return []

  let res = []
  res.push(node.val) // 先将根节点push到数组中
  let L = preorderTraversal(node.left) // 遍历左子树
  let r = preorderTraversal(node.right) // 遍历右子树
  return res.concat(L).concat(r) //拼接
}
console.log(preorderTraversal(node))
```

#### 中序遍历

```js
function preorderTraversal(node) {
  if (!node) return []
  let res = []

  let L = preorderTraversal(node.left) // 遍历左子树
  res.push(node.val) // 将根节点push到数组中
  let r = preorderTraversal(node.right) // 遍历右子树
  return L.concat(res).concat(r)
}
console.log(preorderTraversal(node))
```

#### 后序遍历

```js
function preorderTraversal(node) {
  if (!node) return []
  let res = []

  let L = preorderTraversal(node.left) // 遍历左子树
  let r = preorderTraversal(node.right) // 遍历右子树
  res.push(node.val) // 先访问根节点
  return L.concat(r).concat(res)
}
console.log(preorderTraversal(node))
```

#### 迭代方式遍历树

```js
var preorderTraversal = function (root) {
  if (!root) return []
  // 合理安排入栈和出栈的顺序
  const res = []
  const stack = []
  stack.push(root)
  while (stack.length > 0) {
    const cur = stack.pop()
    res.push(cur.val)

    if (cur.right) {
      stack.push(cur.right)
    }
    if (cur.left) {
      stack.push(cur.left)
    }
  }
  return res
}
```
