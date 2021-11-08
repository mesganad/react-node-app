import { React, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Form, Button, FormGroup, Label, Input, Alert } from "reactstrap";
import { url } from "../../config";
import "./Login.css";

const initUser = { username: "", password: "" };
const clearAccount = {
  name: "",
  username: "",
  role: "",
  password: "",
  email: "",
  project_id: 0,
};

const Login = (props) => {
  const [user, setUser] = useState({ ...initUser });
  const [loginMessage, setLoginMessage] = useState("");
  const [loginData, setLoginData] = useState({
    role: "",
    success: false,
    token: "",
    clearAccount,
  });

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "login", account: loginData.account });
  }, [loginData]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  let logdata = { role: "", success: false, token: "", account: {} };
  let errorMsg = "";
  let acct = {};

  const getResponseData = (data) => {
    setLoginData(data);
    console.log("Inside getter: ", loginData);
  };
  const handleLogin = (e) => {
    e.preventDefault();

    const isValid = formValidation();

    if (isValid) {
      axios.post(`${url}/api/signin`, user).then((resp) => {
        if (resp.data.success) {
          logdata = resp.data;
          getResponseData(logdata);
          localStorage.setItem("account", JSON.stringify(resp.data));
          console.log(
            "From local storage: ",
            JSON.parse(localStorage.getItem("account"))
          );
          switch (loginData.role) {
            case "creoadmin":
              props.history.push("/creoadmin", loginData);
              break;
            case "clientadmin":
              props.history.push("/clientadmin", loginData);
              break;
            case "employee":
              props.history.push("/employee", loginData);
              break;
            default:
              props.history.push("/");
          }
        } else {
          errorMsg = loginData.message;
          setLoginMessage(errorMsg);
          console.log("after login: ", loginMessage);
        }
      });
    }
  };

  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    let isValid = true;

    if (user.username.trim().length < 3 && user.username.trim().length > 0) {
      usernameErr.userNameShort = "Username should be atleast 3 characters";
      isValid = false;
    }
    if (user.username.trim() === null || user.username.trim() === "") {
      usernameErr.usernameEmpty = "Username cannot be empty";
      isValid = false;
    }
    if (user.username.trim().length > 10) {
      usernameErr.userNameLong = "Username should be atmost 10 characters";
      isValid = false;
    }
    if (user.password.trim() === null || user.password.trim() === "") {
      passwordErr.passwordEmpty = "Password cannot be empty";
      isValid = false;
    }
    if (user.password.trim().length < 3 && user.password.trim().length > 0) {
      passwordErr.passwordShort = "Password should be atleast 3 characters";
      isValid = false;
    }
    setUsernameError(usernameErr);
    setPasswordError(passwordErr);
    return isValid;
  };

  return (
    <div>
      {loginMessage ? (
        <Alert className="errorMsg" variant="danger">
          {loginMessage}
        </Alert>
      ) : (
        <span></span>
      )}
      <Form className="login-form" onSubmit={handleLogin}>
        <h3 className="text-center" data-testid="welcome">
          Welcome
        </h3>

        <FormGroup>
          <Label>Username</Label>
          <Input
            type="text"
            data-testid="uname"
            id="username"
            placeholder="Username"
            value={user.username}
            name="username"
            onChange={handleChange}
          />
          {Object.keys(usernameError).map((key) => {
            return (
              <div style={{ color: "red" }} data-testid="usernameVal">
                {usernameError[key]}
              </div>
            );
          })}
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            id="password"
            data-testid="pass"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={handleChange}
          />
          {Object.keys(passwordError).map((key) => {
            return <div style={{ color: "red" }}>{passwordError[key]}</div>;
          })}
        </FormGroup>

        <Button
          className="loginButton btn-lg btn-dark btn-block"
          type="submit"
          data-testid="signin"
        >
          Log in
        </Button>
      </Form>
    </div>
  );
};
export default Login;
