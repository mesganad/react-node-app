import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";

import Login from "./components/Login";

import Admin from "./components/Admin";

import React from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
      </BrowserRouter>
    </div>
  );
}
export default App;
