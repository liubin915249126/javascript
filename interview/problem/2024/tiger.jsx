import { useState } from 'react'

export default function MyComponent() {
  const [counter, setCounter] = useState(0)
  function MyTextField() {
    const [text, setText] = useState('')
    return <input value={text} onChange={(e) => setText(e.target.value)} />
  }
  return (
    <>
      <MyTextField />
      <button
        onClick={() => {
          setCounter(counter + 1)
        }}
      >
        Clicked {counter} times
      </button>
    </>
  )
}

// 现象
// input 可以直接显示输入
// counter 变化时候，input 重置

// 三种更新

function Foo(props) {
    console.log(typeof props.children);
    return props.children;
}

function Foo(props) {
    console.log(typeof props.children);
    return props.children;
}

<Foo /> // undfined
<Foo>1</Foo> // string
<Foo>null</Foo> // string
<Foo>1 2</Foo> // string
<Foo><span>1</span></Foo> // object
