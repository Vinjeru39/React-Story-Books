export default (state, action) => {
  switch (action.type) {
    case "TOGGLE_DRAWER":
      return {
        ...state,
        isDrawerOpen: action.payload,
      };

    case "GET_LOGGEDINUSER":
      return {
        ...state,
        loggedInUser: action.payload,
      };

    default:
      return state;
  }
};
