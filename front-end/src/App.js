import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar/NavBar";
import Login from "./components/authentication/Login";
import CreospanAdmin from "./components/creospan/CreospanAdmin";
import ClientAdmin from "./components/clients/ClientAdmin";
import Employee from "./components/clients/ClientAdmin";

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
