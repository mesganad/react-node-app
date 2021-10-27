import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import { useSelector } from "react-redux";

import "./NavBar.css";
import Dashboard from "../menus/Dashboard";
import Clients from "../menus/Clients";
import Projects from "../menus/Projects";

import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const NavBar = () => {
  const loginData = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Router>
      <Navbar bg="dark" variant={"dark"} expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to={"/"} style={{ fontFamily: "inherit" }}>
            manageproject.com
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to={"/dashboard"}>
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to={"/clients"}>
                Clients
              </Nav.Link>
              <Nav.Link as={Link} to={"/projects"}>
                Projects
              </Nav.Link>
            </Nav>

            <div className="logoutLink">
              {loginData ? (
                <a href="/" onClick={handleLogout}>
                  Logout
                </a>
              ) : (
                <span></span>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          {loginData && loginData.role === "creoadmin" && (
            <Route path="/clients" component={Clients} />
          )}

          {loginData &&
            (loginData.role === "creoadmin" ||
              loginData.role === "clientadmin") && (
              <Route path="/projects" component={Projects} />
            )}
        </Switch>
      </div>
    </Router>
  );
};

export default NavBar;
