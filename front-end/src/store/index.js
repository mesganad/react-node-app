import { createStore } from "redux";

const loginReducer = (state = { account: {} }, action) => {
  if (action.type === "login") {
    console.log("From loginReducer: ", action.account);
    return { ...state, account: action.account };
  }
  return state;
};
const store = createStore(loginReducer);
export default store;
