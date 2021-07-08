# React Hooks Best Practice

React Hooks Api provide a greet development experience, but it also brings the cost, this repo will give some advises to get a good performance. Here are the items which tested and used in Bybit trading sites.

## Reference

### Avoid unnecessary components re-rendering.

- **`1.1`: Take care on constants in component, especially object like constants.**

> Why?
>
> Every time re-render component will re-create constants, it's unnecessary.
>
> `useConstant` pls refer [this code](https://github.com/Andarist/use-constant)

```javascript
// bad
const DemoComponent = () => {
  const name = 'hello';
  const list = ['a','b'];
  return <Card name={name} list={list}>demo</Card>
};

// good
const name = 'hello';
const DemoComponent = () => {
  const list = useConstant(() => ['a','b']);
  return <Card name={name} list={list}>demo</Card>
};
```

- **`1.2`: Don't use inline function**

> Why?
>
> Inline function always return a new reference. So everytime parent component update, it will re-render.

```javascript
// bad
return <DemoButton onClick={(id) => {setId(id)}}>A Button</DemoButton>;

// good
const handleClick = useCallback((id) => {setId(id)}, [/* some inputs */]);
return <DemoButton onClick={handleClick}>A Button</DemoButton>
```

- **`1.3`: Use refs instead of states when only functions used.**

> Why?
>
> Unnecessary state change also get a re-render, should separate stateless properties and stateful properties

```javascript
// bad
const DemoComponent = () => {
  const [state, dispatch] = useStore(); // any state management lib, demo declaration here.
  // state.value modification will let callback reference changed, then child component will re-render.
  const statelessClick = useCallback(() => {
    const { value } = state;
    dispatch({ type: 'some action', value });
  }, [dispatch, state.value]);
  return <DemoButton onClick={statelessClick}></DemoButton>
};


// good
const DemoComponent = () => {
  const [state, dispatch, stateRefs] = useStore(); // any state management lib, demo declaration here.
  const statelessClick = useCallback(() => {
    const { value } = stateRefs.current;
    dispatch({ type: 'some action', value });
  }, [dispatch, stateRefs]);
  return <DemoButton onClick={statelessClick}></DemoBUtton>
};
```

- **`1.5`: Use `useMemo` with `useContext` instead of `React.memo` with `useContext`**

> Why?
>
> `useContext` will notify every used components, it may cause unexpected re-rendering.

```javascript
// bad
const ChildComponent = React.memo(() => {
	const {a, b} = useContext('someContext');
  return <span>{a} + {b} = {a + b}</span>;
});

// good 1
const ChildComponent = () => {
  const {a, b} = useContext('someContext');
  return useMemo(() => {
    return  <span>{a} + {b} = {a + b}</span>;
  }, [a, b])
};

// good 2
// with functions
const ChildComponent = () => {
  // some store implement from contenxt api
  const [states, dispatch, stateRefs] = useContextStore('someContext');
  return useMemo(() => {
    const { a, b } = states;
    // no need also can't use `useCallback` here.
    const handleClick = () => {
      console.log(a + b); // use stateRefs.current.a also correct
    };

    return  <span onClick={handleClick}>{a} + {b} = {a + b}</span>;
  }, [states.a, states.b]);
};
```






