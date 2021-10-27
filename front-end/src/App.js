import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar/NavBar";
import Signup from "./components/authentication/Signup";

import Login from "./components/authentication/Login";

import CreospanAdmin from "./components/creospan/CreospanAdmin";
import ClientAdmin from "./components/clients/ClientAdmin";
import Employee from "./components/clients/Employee";

import React from "react";

function App() {
  return (
    <div className="app__container">
      <NavBar/>
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/creoadmin" component={CreospanAdmin} />
        <Route path="/clientadmin" component={ClientAdmin} />
        <Route path="/employee" component={Employee} />
      </BrowserRouter>
    </div>
  );
}
export default App;
