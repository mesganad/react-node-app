import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NabBar";
import Signup from "./components/Signup";

import Login from "./components/Login";

import Admin from "./components/Admin";

import React from "react";

function App() {
  return (
    <div className="app__container">
      <NavBar />
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/admin" component={Admin} />
      </BrowserRouter>
    </div>
  );
}
export default App;
