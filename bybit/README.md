### bybit
#### 性能优化
[前端性能优化实践 之 百度App个人主页优化](https://segmentfault.com/a/1190000022194498)
[掘金前端性能优化](https://juejin.im/search?query=%E5%89%8D%E7%AB%AF%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96&type=all)
[](https://segmentfault.com/a/1190000022205291)(https://segmentfault.com/a/1190000022198546)
[性能分析](https://juejin.im/post/5e849e6de51d4546e14f4304)

#### 分享
encodeURIComponent 转译字符
```js
// shareWeiBo
const sharesinastring = `http://v.t.sina.com.cn/share/share.php?title=${encodeURIComponent(`${share} ${shareUrl}`)}&url=${encodeURIComponent(shareUrl)}&content=utf-8&sourceUrl=${encodeURIComponent(shareUrl)}&pic=${'picurl'}`;
      window.open(
        sharesinastring,
        'newwindow',
        'height=400,width=400,top=100,left=100',
      );
// shareTwitter
window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${share} ${shareUrl}`)}`,
      ); 

// shareFB
window.open(`https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareUrl)}`);           
```      
monit restart nodejs.www.home 


el.contains(node)
#### node 发送邮件
ejs nodemailer
#### 验证码
svg-captcha
#### emmet
"emmet.triggerExpansionOnTab": true,
#### webpack5
Module Federation 
#### cookie
const results = document.cookie.match(`(^|;) ?${cookie_name}=([^;]*)(;|$)`);
if (results) {
  return (unescape(results[2]));
}
#### open
react-dev-utils/openBrowser 
open
#### react 事件机制
https://segmentfault.com/a/1190000022616537
https://toutiao.io/posts/28of14w/preview

pointer-events: none;
#### dark mode
@media (prefers-color-scheme: dark) {
  html {
    filter: invert(1) hue-rotate(180deg);
  }
  html img {
    filter: invert(1) hue-rotate(180deg);
  }
}
