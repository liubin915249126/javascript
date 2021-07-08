## web component

#### Custom Element 自定义元素

```js
customElements.define(name, constructor, options);
// name 就是你自定义的元素名称（符合 DOMString 标准，必须带短横线），以上述为例，可以通过 <my-component></my-component> 的形式使用
// constructor 就是我们定义的组件
// options 声明了我们定义的是哪种类型的自定义元素，目前只有一个extends可用，指定继承于什么元素。
// 当定义了继承什么元素之后，使用方式就与自定义元素不太一致了，需要用到 is 属性假设你定义了一个名为my-paragraph的继承自p标签的自定义内置元素，那么使用时，需要 <p is="my-paragraph"></p> 这样写

class extends HTMLElement {
    constructor() {
      super()
      this.handleClick = this.handleClick.bind(this)

      const wrapper = document.createElement('span');
      wrapper.setAttribute('class','wrapper');
      const info = document.createElement('span');
      info.setAttribute('class','info');
      info.textContent = this.getAttribute('text') || 'default';

      this.appendChild(wrapper);
      wrapper.appendChild(info);

      const button = this.querySelector('#button');
      button.addEventListener('click', this.handleClick)
    }
    static get observedAttributes(){

    }
    handleClick () {
      this.parentNode.removeChild(this)
    }
}
// use
<my-life-cycle-component>
  <button id='button'>Remove this</button>
</my-life-cycle-component>


```

#### life-cycle

- connectedCallback ：当 custom element 首次被插入文档 DOM 时，被调用。
- disconnectedCallback ：当 custom element 从文档 DOM 中删除时，被调用。
- adoptedCallback ：当 custom element 被移动到新的文档时，被调用。
- attributeChangedCallback ：当 custom element 增加、删除、修改自身属性时，被调用

#### Shadow DOM 影子 DOM

来了十分强大的封装能力，能够完全的将组件的结构，样式和行为动作对外隐藏起来，对外隔离

```
customElements.define('my-component', class extends HTMLElement {
    constructor() {
      super()

      const shadow = this.attachShadow({mode: 'open'});
      const info = document.createElement('span');

      info.setAttribute('class','info');
      info.textContent = this.getAttribute('text') || 'default';

      const style = document.createElement('style')
      style.textContent = `
        span {
          color: red;
        }
      `
      // this.appendChild(info)
      shadow.appendChild(style);
      shadow.appendChild(info);

    }
})
```

#### Template & Slot

template 中的内容在渲染 HTML 到屏幕上的时候不会显示出来，需要通过 Javascript 获取到模版后才能实例化，并渲染到页面上。

```js
customElements.define('my-component', class extends HTMLElement {
    constructor() {
      super()

      const template = document.getElementById('my-paragraph');
      const templateContent = template.content.cloneNode(true);
      const shadow = this
          .attachShadow({mode: 'open'})
          .appendChild(templateContent);
    }
})

// 使用
<template id="my-component">
    <style>
        span {
          color: red;
        }
    </style>
    <span name="my-slot" class='info' >default</span>
</template>
// 使用
<my-component>
    <span slot="my-slot">
        12312312
    </span>
</my-component>

```

[referer](https://juejin.cn/post/6976557762377416718)
[webcomponents](https://www.webcomponents.org/introduction)

## [Lit](./Lit.md)
看下我们刚才说到的 Web-Component 里面的几个槽点
- 响应式仅有回调，无法自动映射到UI上
- 没有 state 内部状态，自己维护的状态无法直接监听变化
- 没有模版语法（可以用 slot 和 template）