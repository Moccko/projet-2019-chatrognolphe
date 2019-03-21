import { createStore, combineReducers } from "redux";
import loginUser from "./reducers/UserReducer";

export default createStore(loginUser);
// export default createStore(combineReducers({ loginUser }));
