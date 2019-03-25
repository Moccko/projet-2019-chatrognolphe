const initialState = { user: undefined };

export default function loginUser(state = initialState, action) {
  switch (action.type) {
    case "LOG_IN":
      return {
        user: action.value
      };
    default:
      return state;
  }
}
