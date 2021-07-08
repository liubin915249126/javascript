const {produce} = require('./immer')

const state = {
  done: false,
  val: {
    name: 'old'
  },
};
const newState = produce(state, (draft) => {
  draft.val.name = 'new';
});
console.log(state.val === newState.val )
