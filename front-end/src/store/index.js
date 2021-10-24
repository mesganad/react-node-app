import { createStore } from "redux";

const loginReducer = (state = { token: "" }, action) => {
  if (action.type === "login") {
    console.log("From loginReducer: ", action.token);
    return { ...state, token: action.token };
  }
  return state;
};
const store = createStore(loginReducer);
export default store;
