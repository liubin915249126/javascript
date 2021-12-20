## PureComponent
使用浅比较判断组件是否需要重绘
如果直接修改了state，则不会更新

#### 一些陷阱
```js
{this.props.items.map(i =>
    <Cell data={i} options={this.props.options || []} />
)}
// 若options为空，则会使用[]。[]每次会生成新的Array，因此导致Cell每次的props都不一样，导致需要重绘。解决方法如下:
const default = [];
{this.props.items.map(i =>
  <Cell data={i} options={this.props.options || default} />
)}
```
```js
// 函数也经常作为props传递，由于每次需要为内联函数创建一个新的实例，所以每次function都会指向不同的内存地址。比如：
render() {
     <MyInput onChange={e => this.props.update(e.target.value)} />;
}
// 以及
update(e) {
     this.props.update(e.target.value);
}
render() {
     return <MyInput onChange={this.update.bind(this)} />;
}
// 注意第二个例子也会导致创建新的函数实例。为了解决这个问题，需要提前绑定this指针：
constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }
  update(e) {
    this.props.update(e.target.value);
  }
  render() {
    return <MyInput onChange={this.update} />;
  }
```