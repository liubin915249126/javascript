## web animation

#### animations

- CSS 动画
- (requestAnimationFrame/setTimeout/setInterval + 属性改变) 动画
- web animation api

#### web animation api

- KeyframeEffect 描述动画属性
  new KeyframeEffect(target, keyframes);
  new KeyframeEffect(target, keyframes, options)
  new KeyframeEffect(source)
- Animation 控制播放

```js
const box1ItemEl = document.querySelector(".box1");

const kyEffect = new KeyframeEffect(
  box1ItemEl,
  {
    transform: ["translateX(0)", "translateX(200px)"],
  },
  { duration: 3000, fill: "forwards" }
);

const ani1 = new Animation(kyEffect);
ani1.play();
```

#### Element.animate

```js
element.animate(
  [{ opacity: 1 }, { opacity: 0.1, offset: 0.7 }, { opacity: 0 }],
  2000
);

element.animate(
  {
    opacity: [0, 0.9, 1],
    offset: [0, 0.8], // [ 0, 0.8, 1 ] 的简写
    easing: ["ease-in", "ease-out"],
  },
  2000
);
```
