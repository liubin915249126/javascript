前端字节（实习）
一面
自我介绍
介绍项目
滑动懒加载如何实现
如果出现了问题怎么办
http状态码
讲一下http缓存
promise
设计方法清理缓存
爬楼梯
vue响应式原理
了解react吗
二面
介绍一下做过的项目
看题说输出: 原型链，this，promise
实现[[‘a’, ‘b’], [‘n’, ‘m’], [‘0’, ‘1’]] => [“an0”, “an1”, “am0”, “am1”, “bn0”, “bn1”, “bm0”, “bm1”]
实现事件代理
输入url到页面渲染
三面
自我介绍
根据自我介绍的内容进行提问
js 和 java 的区别
作用域 和 this 相关的题目
一道js编程题
对 css 的了解
css 样式优先级
前端性能衡量指标
前端性能优化方法
hr面
自我介绍
为什么学前端
职业规划
实习目的
入职时间
对部门的了解
反问



2021前端字节跳动真题解析
内容大纲包括：HTML(5)，CSS(3) 基础，JavaScript 基础，Vue框架，计算机网络基础，算法

HTML
HTML5 有哪些新特性？
Doctype作⽤? 严格模式与混杂模式如何区分？它们有何意义?
如何实现浏览器内多个标签页之间的通信？
⾏内元素有哪些？块级元素有哪些？ 空(void)元素有那些？⾏内元 素和块级元素有什么区别？
简述⼀下src与href的区别？
cookies,sessionStorage,localStorage 的区别？
HTML5 的离线储存的使用和原理？
怎样处理 移动端 1px 被 渲染成 2px 问题？
浏览器是如何渲染页面的？
iframe 的优缺点？
Canvas 和 SVG 图形的区别是什么？
meta 标签？




CSS 基础
请你讲一讲 CSS 的权重和优先级
介绍 Flex 布局，flex 是什么属性的缩写：
CSS 怎么画一个大小为父元素宽度一半的正方形？
CSS实现自适应正方形、等宽高比矩形
实现两栏布局的方式
实现三列布局的方式
CSS 动画有哪些？
用css2和css3分别写一下垂直居中和水平居中
visibility 和 display 的差别（还有opacity)
opacity 可以有过渡效果嘛？
BFC 与 IFC 区别
BFC会与float元素相互覆盖吗？为什么？举例说明
了解box-sizing吗？
什么是 BFC
了解盒模型吗？
说一下你知道的position属性，都有啥特点？
两个div上下排列，都设margin，有什么现象？
清除浮动有哪些方法？




JavaScript 基础
问：0.1 + 0.2 === 0.3 嘛？为什么？
JS 数据类型
JS 整数是怎么表示的？
Number() 的存储空间是多大？如果后台发送了一个超过最大自己的数字怎么办
写代码：实现函数能够深度克隆基本类型
事件流
事件是如何实现的？
new 一个函数发生了什么
new 一个构造函数，如果函数返回 return {} 、 return null ， return 1 ， return true 会发生什么情况？
symbol有什么用处
闭包是什么？
闭包产生的本质
一般如何产生闭包
闭包的应用场景
什么是作用域？
什么是作用域链？
NaN 是什么，用 typeof 会输出什么？
JS 隐式转换，显示转换
了解 this 嘛，bind，call，apply 具体指什么
手写 bind、apply、call
setTimeout(fn, 0)多久才执行，Event Loop
手写题：Promise 原理
js脚本加载问题，async、defer问题
如何判断一个对象是不是空对象？
<script src=’xxx’ ’xxx’/>外部js文件先加载还是onload先执行，为什么？
怎么加事件监听
事件传播机制（事件流）
说一下原型链和原型链的继承吧
说下对 JS 的了解吧
数组能够调用的函数有那些？
如何判断数组类型
函数中的arguments是数组吗？类数组转数组的方法了解一下？
用过 TypeScript 吗？它的作用是什么？
PWA使用过吗？serviceWorker的使用原理是啥？
ES6 之前使用 prototype 实现继承
如果一个构造函数，bind了一个对象，用这个构造函数创建出的实例会继承这个对象的属性吗？为什么？
箭头函数和普通函数有啥区别？箭头函数能当构造函数吗？
知道 ES6 的 Class 嘛？Static 关键字有了解嘛
事件循环机制 （Event Loop）
手写题：数组扁平化
手写题：实现柯里化
手写题：数组去重
let 闭包
变量提升
instance 如何使用




Vue框架
active-class是哪个组件的属性？嵌套路由怎么定义？
怎么定义vue-router的动态路由？怎么获取传过来的动态参数？
vue-router有哪几种导航钩子？
scss是什么？在vue.cli中的安装使用步骤是？有哪几大特性？
mint-ui是什么？怎么使用？说出至少三个组件使用方法？
v-model是什么？怎么使用？ vue中标签怎么绑定事件？
axios是什么？怎么使用？描述使用它实现登录功能的流程？
axios+tp5进阶中，调用axios.post(‘api/user’)是进行的什么操作？axios.put(‘api/user/8′)呢？
什么是RESTful API？怎么使用?
vuex是什么？怎么使用？哪种功能场景使用它？
mvvm框架是什么？它和其它框架（jquery）的区别是什么？哪些场景适合？
自定义指令（v-check、v-focus）的方法有哪些？它有哪些钩子函数？还有哪些钩子函数参数？
说出至少4种vue当中的指令和它的用法？
vue-router是什么？它有哪些组件？
导航钩子有哪些？它们有哪些参数？
Vue的双向数据绑定原理是什么？
请详细说下你对vue生命周期的理解？
请说下封装 vue 组件的过程？
你是怎么认识vuex的？
vue-loader是什么？使用它的用途有哪些？
请说出vue.cli项目中src目录每个文件夹和文件的用法？
vue.cli中怎样使用自定义的组件？有遇到过哪些问题吗？
聊聊你对Vue.js的template编译的理解？
Vuex是什么？为什么使用Vuex？
vuejs与angularjs的区别？
vue为什么不直接操作dom？
你怎么理解vue是一个渐进式的框架？
Vue声明组件的state是用data方法，那为什么data是通过一个function来返回一个对象，而不是直接写一个对象呢？
说下vue组件之间的通信？
vue中mixin与extend区别？




计算机网络基础
HTTP 缓存
HTTP 常用的状态码及使用场景？
你知道 302 状态码是什么嘛？你平时浏览网页的过程中遇到过哪些 302 的场景？
HTTP 常用的请求方式，区别和用途？
你对计算机网络的认识怎么样
HTTPS 是什么？具体流程
三次握手和四次挥手
在交互过程中如果数据传送完了，还不想断开连接怎么办，怎么维持？
你对 TCP 滑动窗口有了解嘛？
WebSocket与Ajax的区别
了解 WebSocket 嘛？
HTTP 如何实现长连接？在什么时候会超时？
Fetch API与传统Request的区别
POST一般可以发送什么类型的文件，数据处理的问题
TCP 如何保证有效传输及拥塞控制原理。
http知道嘛？哪一层的协议？（应用层）
OSI七层模型和TCP/IP四层模型
TCP 协议怎么保证可靠的，UDP 为什么不可靠？
HTTP 2 改进
DDOS 攻击




算法
链表
前序遍历判断回文链表
反转链表
合并K个升序链表
K 个一组翻转链表
环形链表
排序链表
相交链表
字符串

【面试真题】最长回文子串【双指针】
最长公共前缀【双指针】
无重复字符的最长子串【双指针】
【面试真题】最小覆盖子串【滑动窗口】
数组问题

【面试真题】俄罗斯套娃信封问题【排序+最长上升子序列】
最长连续递增序列【快慢指针】
最长连续序列 【哈希表】
【面试真题】盛最多水的容器【哈希表】
寻找两个正序数组的中位数【双指针】
删除有序数组中的重复项【快慢指针】
和为K的子数组【哈希表】
nSum问题【哈希表】
【面试真题】接雨水【暴力+备忘录优化】
跳跃游戏【贪心算法】
二叉树

二叉树的最近公共祖先
二叉搜索树中的搜索
删除二叉搜索树中的节点
完全二叉树的节点个数
二叉树的锯齿形层序遍历
排序算法

用最少数量的箭引爆气球
合并区间【排序算法+区间问题】
二分查找

判断子序列【二分查找】
在排序数组中查找元素的第一个和最后一个位置【二分搜索】
动态规划

最长递增子序列
【面试真题】 零钱兑换
【面试真题】 最长公共子序列
编辑距离
【面试真题】最长回文子序列
【面试真题】最大子序和
【面试真题】 买卖股票的最佳时机
BFS

打开转盘锁
二叉树的最小深度
栈
最小栈【栈】
下一个更大元素
【面试真题】有效的括号
简化路径
DFS

岛屿的最大面积
相同的树

回溯算法
N皇后
全排列
括号生成
复原 IP 地址
子集

