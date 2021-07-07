## 跨平台

#### 有接触过哪些移动端跨平台框架？说下jsBridge？
- 跨平台
    - Cordova(PhoneGap)
    - React Native
    - Flutter
    - uniapp
    - taro
    - 快应用
- jsBridge 
    - 混合开发中的前端部分可以方便地使用 Native 的功能（例如：地址位置、摄像头）。
      它的核心是构建 Native 和非 Native 间消息通信的通道，而且这个通信的通道是双向的。
    
    - 注入API
      通过 WebView 提供的接口，向 JavaScript 的 Context（window）中注入对象或者方法，让 JavaScript 调用时，直接执行相应的 Native 代码逻辑，达到 JavaScript 调用 Native 的目的。
    - 拦截 URL SCHEME  
      qunarhy://hy/url?url=ymfe.tech，<!-- protocol 是 qunarhy，host 则是 hy。 -->
    - load url("javascript:js_method()");

#### 说下react-native的原理，原生端和js端是怎么通信的？
<!-- TODO -->
#### flutter有了解过吗？为什么说它的性能可以媲美原生？它有什么缺点吗？
<!-- TODO -->
#### flutter 与 react-native
Skia
####
