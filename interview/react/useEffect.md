```js
function areHookInputsEqual(nextDeps, prevDeps) {
  if (prevDeps === null) {
    return false
  }

  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (Object.is(nextDeps[i], prevDeps[i])) {
      continue
    }

    return false
  }

  return true
}
```

```js
module.exports = function is(a, b) {
  if (a === 0 && b === 0) {
    return 1 / a === 1 / b
  }

  if (a === b) {
    return true
  }

  if (numberIsNaN(a) && numberIsNaN(b)) {
    return true
  }

  return false
}
```
