import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import "./NavBar.css";
import Dashboard from "../menus/Dashboard";
import Clients from "../menus/Clients";
import Projects from "../menus/Projects";
import AddProject from "../menus/AddProject";
import AddClient from "../menus/AddClient";
import Tasks from "../menus/Tasks";
import Signup from "../authentication/Signup";

import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const NavBar = (props) => {
  let loginData = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear("user");
    window.location.reload();
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
              {loginData ? (
                <Nav.Link as={Link} to={"/dashboard"}>
                  Dashboard
                </Nav.Link>
              ) : (
                <span></span>
              )}
              {loginData && loginData.role === "creoadmin" ? (
                <Nav.Link as={Link} to={"/clients"}>
                  Clients
                </Nav.Link>
              ) : (
                <span></span>
              )}

              {loginData ? (
                <Nav.Link as={Link} to={"/projects"}>
                  Projects
                </Nav.Link>
              ) : (
                <span></span>
              )}

              {loginData &&
              (loginData.role === "creoadmin" ||
                loginData.role === "clientAdmin") ? (
                <Nav.Link as={Link} to={"/addProject"}>
                  Add Project
                </Nav.Link>
              ) : (
                <span></span>
              )}
              {loginData && loginData.role === "creoadmin" ? (
                <Nav.Link as={Link} to={"/addClient"}>
                  Add Client
                </Nav.Link>
              ) : (
                <span></span>
              )}
              {loginData && loginData.role === "creoadmin" ? (
                <Nav.Link as={Link} to={"/signup"}>
                  Create User
                </Nav.Link>
              ) : (
                <span></span>
              )}

              {loginData ? (
                <Nav.Link as={Link} to={"/tasks"}>
                  Tasks
                </Nav.Link>
              ) : (
                <span></span>
              )}

              <div className="logoutLink">
                {loginData != null ? (
                  <Link to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                ) : (
                  <span></span>
                )}
              </div>
            </Nav>
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

{loginData && (
              <Route path="/" component={Dashboard} />
            )}

{loginData &&
            (loginData.role === "creoadmin" ||
              loginData.role === "clientadmin") && (
              <Route path="/addProject" component={AddProject} />
            )}

{loginData &&
            (loginData.role === "creoadmin") && (
              <Route path="/addClient" component={AddClient} />
            )}

{loginData &&
            (loginData.role === "creoadmin") && (
              <Route path="/signup" component={Signup} />
            )}

{loginData  && (
              <Route path="/tasks" component={Tasks} />
            )}
        </Switch>
      </div>
    </Router>
  );
};

export default NavBar;
