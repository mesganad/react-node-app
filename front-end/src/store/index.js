import { createStore } from "redux";

const loginReducer = (state = { loginData: {} }, action) => {
  if (action.type === "login") {
    console.log("From loginReducer: ", action.loginData);
    return { ...state, loginData: action.loginData };
  }
  return state;
};
const store = createStore(loginReducer);
export default store;
