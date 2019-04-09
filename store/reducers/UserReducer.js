const initialState = {
  user: null,
  channels: null,
  users: null
};

export default function loginUser(state = initialState, action) {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: action.value
      };
    case "LOG_OUT":
      return {
        user: null,
        channels: null,
        users: null
      };
    case "UPDATE_CHANNELS":
      return {
        ...state,
        channels: action.value
      };
    case "UPDATE_USERS":
      return {
        ...state,
        users: action.value
      };
    default:
      return state;
  }
}
