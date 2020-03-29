### bybit
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

el.contains(node)
#### node 发送邮件
ejs nodemailer
#### 验证码
svg-captcha