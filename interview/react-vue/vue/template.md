## template compiler

- parse 函数解析 template
- optimize 函数优化静态内容
- generate 函数创建 render 函数字符串

### parse
AST
template 字符串里的元素、属性和文本一个个地截取出来
// parse 里定义的一些正则
export const onRE = /^@|^v-on:/ //匹配 v-on
export const dirRE = /^v-|^@|^:/ //匹配 v-on 和 v-bind
export const forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/ //匹配 v-for 属性
export const forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/ //匹配 v-for 的多种形式

#### optimize 函数优化静态内容
标记所有的静态和非静态结点
```js
function markStatic (node: ASTNode) {
  // 标记 static 属性
  node.static = isStatic(node)
  if (node.type === 1) {
    // 注意这个判断逻辑
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (let i = 0, l = node.children.length; i < l; i++) {
      const child = node.children[i]
      markStatic(child)
      if (!child.static) {
        node.static = false
      }
    }
  }
}
```
>
1. 如果是表达式AST节点，直接返回 false
2. 如果是文本AST节点，直接返回 true
3. 如果元素是元素节点，阶段有 v-pre 指令 ||
  1. 没有任何指令、数据绑定、事件绑定等 &&
  2. 没有 v-if 和 v-for &&
  3. 不是 slot 和 component &&
  4. 是 HTML 保留标签 &&
  5. 不是 template 标签的直接子元素并且没有包含在 for 循环中则返回 true
>

#### generate 生成 render
>
几种内部方法
_c：对应的是 createElement 方法，顾名思义，它的含义是创建一个元素(Vnode)
_v：创建一个文本结点。
_s：把一个值转换为字符串。（eg: {{data}}）
_m：渲染静态内容
>
