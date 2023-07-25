// 还是利用 Array + Cursor的思路
const allDeps: any[][] = []
let effectCursor: number = 0

function useEffect(callback: () => void, deps: any[]) {
  if (!allDeps[effectCursor]) {
    // 初次渲染：赋值 + 调用回调函数
    allDeps[effectCursor] = deps
    ++effectCursor
    callback()
    return
  }

  const currenEffectCursor = effectCursor
  const rawDeps = allDeps[currenEffectCursor]
  // 检测依赖项是否发生变化，发生变化需要重新render
  const isChanged = rawDeps.some(
    (dep: any, index: number) => dep !== deps[index]
  )
  if (isChanged) {
    callback()
    allDeps[effectCursor] = deps // 感谢 juejin@carlzzz 的指正
  }
  ++effectCursor
}

function render() {
  ReactDOM.render(<App />, document.getElementById('root'))
  effectCursor = 0 // 注意将 effectCursor 重置为0
}
