#### Doctype 作⽤? 严格模式与混杂模式如何区分？它们有何意义?

- <!DOCTYPE>声明位于位于HTML文档中的第一行，处于 <html> 标签之前。告知浏览器的解析器用什么文档标准解析这个文
  档。DOCTYPE 不存在或格式不正确会导致文档以兼容模式呈现。
  标准模式(严格模式)的排版和 JS 运作模式都是以该浏览器支持的最高标准运行。
  在兼容模式（混杂模式或怪异模式）中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。

#### 如何实现浏览器内多个标签页之间的通信？

- sharedWorker
- localstorage

#### ⾏内元素有哪些？块级元素有哪些？ 空(void)元素有那些？⾏内元 素和块级元素有什么区别？

#### 简述⼀下 src 与 href 的区别？

src 用于替换当前元素；href 用于在当前文档和引用资源之间确立联系。
src 是 source 的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置
href 是 Hypertext Reference 的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接

#### iframe 的优缺点？

iframe 的优点：
1.iframe 能够原封不动的把嵌入的网页展现出来。
2.如果有多个网页引用 iframe，那么你只需要修改 iframe 的内容，就可以实现调用的每一个页面内容的更改，方便快捷。
3.网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用 iframe 来嵌套，可以增加代码的可重用。
4.如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由 iframe 来解决。
iframe 的缺点： 1.会产生很多页面，不容易管理。
2.iframe 框架结构有时会让人感到迷惑，如果框架个数多的话，可能会出现上下、左右滚动条，会分散访问者的注意力，用户体验度差。
3.代码复杂，无法被一些搜索引擎索引到，这一点很关键，现在的搜索引擎爬虫还不能很好的处理 iframe 中的内容，所以使用 iframe 会不利于搜索引擎优化。
4.很多的移动设备（PDA 手机）无法完全显示框架，设备兼容性差。
5.iframe 框架页面会增加服务器的 http 请求，对于大型网站是不可取的。
分析了这么多，现在基本上都是用 Ajax 来代替 iframe，所以 iframe 已经渐渐的退出了前端开发
