const initialState = {};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
