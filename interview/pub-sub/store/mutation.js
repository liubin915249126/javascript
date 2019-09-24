export default {
    addBook(state, payload) {
      state.bookList.push(payload);
      return state;
    }
  };