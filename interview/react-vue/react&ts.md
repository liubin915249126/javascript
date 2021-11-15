## react typescript

#### 组件
```ts
// React.Component<P, S={}> 和 React.PureComponent<P, S={} SS={}>
// React.PureComponent是有第三个参数的，它表示getSnapshotBeforeUpdate的返回值。
interface IProps {
  name: string;
}

interface IState {
  count: number;
}

class App extends React.Component<IProps, IState> {
  state = {
    count: 0
  };

  render() {
    return (
      <div>
        {this.state.count}
        {this.props.name}
      </div>
    );
  }
}

export default App;

// 那如果定义时候我们不知道组件的props的类型，只有在调用时才知道组件类型，该怎么办呢？这时泛型就发挥作用了：
// 定义组件
class MyComponent<P> extends React.Component<P> {
  internalProp: P;
  constructor(props: P) {
    super(props);
    this.internalProp = props;
  }
  render() {
    return (
    	 <span>hello world</span>
    );
  }
}

// 使用组件
type IProps = { name: string; age: number; };

<MyComponent<IProps> name="React" age={18} />;          // Success
<MyComponent<IProps> name="TypeScript" age="hello" />;  // Error

```
```ts
// 函数式组件
interface IProps {
  name: string
}
const App = (props: IProps) => {
  const {name} = props;

  return (
    <div className="App">
      <h1>hello world</h1>
      <h2>{name}</h2>
    </div>
  );
}

export default App;
// 
interface IProps {
  name: string
}

const App: React.FC<IProps> = (props) => {
  const {name} = props;
  return (
    <div className="App">
      <h1>hello world</h1>
      <h2>{name}</h2>
    </div>
  );
}

export default App;
// React.FC 显式地定义了返回类型，其他方式是隐式推导的；
// React.FC 对静态属性：displayName、propTypes、defaultProps 提供了类型检查和自动补全；
// React.FC 为 children 提供了隐式的类型（ReactElement | null）。

```

#### hooks
```ts
const [count, setCount] = useState<number>(1)
// 如果state是一个对象，想要初始化一个空对象，可以使用断言来处理：
const [user, setUser] = React.useState<IUser>({} as IUser);
const nameInput = React.useRef<HTMLInputElement | null>(null);


const calculatedValue = useMemo<number>(() => a ** 2, [a]);


```

[referer](https://juejin.cn/post/7021674818621669389)