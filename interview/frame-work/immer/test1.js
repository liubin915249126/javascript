const {produce} = require('./immer1')

const a = { b: 1 } 
  const c = { d: 2 } 
  const state = { 
    a: a, 
    c: c, 
    d: {  
      c: { e: 4 }, 
      f: 2 
    } 
  } 
  var state2 = produce(state, draft => { 
    draft.a.b = 21222 
    draft.a.f = 3 
  }) 
  console.log(state2.d === state.d, true) 
  console.log(state2 === state, false) 
  console.log(state2.a.f, 3) 
  console.log(state.a.b, 1) 
  console.log(state2.a.b, 21222) 