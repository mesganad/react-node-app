import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import Tasks from "../menus/Tasks";
import Signup from "../authentication/Signup";
import CreospanAdmin from "../creospan/CreospanAdmin";
import ClientAdmin from "../clients/ClientAdmin";
import Employee from "../clients/Employee";
import PageNotFound from "../menus/PageNotFound";
import Login from "../authentication/Login";
import SideBar from "../sidebar/SideBar";

import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import AdminDashboard from "../dashboard/admindashboard";

const NavBar = () => {
  //let loginData = JSON.parse(localStorage.getItem("account"));

  const loginData = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: "login", account: null });
    // window.location.reload();
    //window.location.href = "/";
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
              {loginData && loginData.role === "creoadmin" ? (
                <Nav.Link as={Link} to={"/creoadmin"} data-testid="creodash">
                  Dashboard
                </Nav.Link>
              ) : null}
              {loginData && loginData.role === "clientadmin" ? (
                <Nav.Link as={Link} to={"/clientadmin"}>
                  Dashboard
                </Nav.Link>
              ) : null}
              {loginData && loginData.role === "employee" ? (
                <Nav.Link as={Link} to={"/employee"}>
                  Dashboard
                </Nav.Link>
              ) : null}
              {loginData && loginData.role === "creoadmin" ? (
                <Nav.Link as={Link} to={"/clients"} data-testid="clients">
                  Clients
                </Nav.Link>
              ) : null}
              {loginData ? (
                <Nav.Link as={Link} to={"/projects"} data-testid="projects">
                  Projects
                </Nav.Link>
              ) : null}
              {loginData && loginData.role === "creoadmin" ? (
                <Nav.Link as={Link} to={"/signup"} data-testid="register">
                  Register User
                </Nav.Link>
              ) : null}
              {loginData &&
              (loginData.role === "employee" ||
                loginData.role === "clientadmin") ? (
                <Nav.Link as={Link} to={"/tasks"} data-testid="tasks">
                  Tasks
                </Nav.Link>
              ) : null}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div className="logoutLink">
                {loginData != null ? (
                  <Link to="/" onClick={handleLogout} data-testid="logout">
                    Logout
                  </Link>
                ) : null}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="main_container">
        <SideBar />
        <div className="content">
          <Switch>
            <Route exact path="/dashboard" component={AdminDashboard} />
            {loginData && loginData.role === "creoadmin" && (
              <Route exact path="/clients" component={Clients} />
            )}

            {loginData &&
              (loginData.role === "creoadmin" ||
                loginData.role === "clientadmin") && (
                <Route exact path="/projects" component={Projects} />
              )}

            {loginData && loginData.role === "creoadmin" && (
              <Route exact path="/signup" component={Signup} />
            )}

            {loginData && loginData.role === "creoadmin" && (
              <Route exact path="/creoadmin" component={CreospanAdmin} />
            )}
            {loginData && loginData.role === "clientadmin" && (
              <Route exact path="/clientadmin" component={ClientAdmin} />
            )}

            {loginData && loginData.role === "employee" && (
              <Route exact path="/employee" component={Employee} />
            )}

            {loginData && <Route exact path="/tasks" component={Tasks} />}
            {!loginData ? <Route exact path="/" component={Login} /> : null}

            {loginData === null && (
              <Route exact path="*" component={PageNotFound} />
            )}
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default NavBar;
