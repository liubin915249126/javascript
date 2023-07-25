// setState
import React from 'react'
import ReactDOM from 'react-dom'

const states: any[] = []
let cursor: number = 0

function useState<T>(initialState: T): [T, (newState: T) => void] {
  const currenCursor = cursor
  states[currenCursor] = states[currenCursor] || initialState // 检查是否渲染过

  function setState(newState: T) {
    states[currenCursor] = newState
    render()
  }

  ++cursor // update: cursor
  return [states[currenCursor], setState]
}

function App() {
  const [num, setNum] = useState < number > 0
  const [num2, setNum2] = useState < number > 1

  return (
    <div>
      <div>num: {num}</div>
      <div>
        <button onClick={() => setNum(num + 1)}>加 1</button>
        <button onClick={() => setNum(num - 1)}>减 1</button>
      </div>
      <hr />
      <div>num2: {num2}</div>
      <div>
        <button onClick={() => setNum2(num2 * 2)}>扩大一倍</button>
        <button onClick={() => setNum2(num2 / 2)}>缩小一倍</button>
      </div>
    </div>
  )
}

function render() {
  ReactDOM.render(<App />, document.getElementById('root'))
  cursor = 0 // 重置cursor
}

render() // 首次渲染
