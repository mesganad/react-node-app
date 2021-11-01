import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar/NavBar";
import Login from "./components/authentication/Login";

import React from "react";

function App() {
  let loginData = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="app__container">
      <NavBar />
      <BrowserRouter>
        {!loginData && <Route path="/" component={Login} />}
      </BrowserRouter>
    </div>
  );
}
export default App;
