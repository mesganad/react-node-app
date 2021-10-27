import React from "react";
import axios from "axios";
// import { useDispatch } from "react-redux";
import { Form, Button, FormGroup, Label, Input } from "reactstrap";
import { url } from "../../config";
import "./Login.css";

const initUser = { username: "", password: "" };

const Login = (props) => {
  const [user, setUser] = React.useState({ ...initUser });
  // const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const resp = await axios.post(`${url}/api/signin`, user);

    console.log("After successful login: ", resp.data);

    localStorage.setItem("user", JSON.stringify(resp.data));

    // dispatch({ type: "login", loginData: resp.data });

    const loginData = resp.data;
    console.log(loginData);

    switch (resp.data.role) {
      case "creoadmin":
        props.history.push("/creoadmin", user);
        break;
      case "clientadmin":
        props.history.push("/creoadmin", user);
        break;
      case "employee":
        props.history.push("/employee", user);
        break;
      default:
        props.history.push("/");
    }
  };

  return (
    <Form className="login-form">
      <h1>
        <span className="font-weight-bold">manageproject</span>.com
      </h1>
      <h3 className="text-center">Welcome</h3>

      <FormGroup>
        <Label>Username</Label>
        <Input
          type="text"
          id="username"
          placeholder="Username"
          value={user.username}
          name="username"
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label>Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={user.password}
          name="password"
          onChange={handleChange}
        />
      </FormGroup>

      <Button
        className="loginButton btn-lg btn-dark btn-block"
        onClick={handleLogin}
      >
        Log in
      </Button>
    </Form>
  );
};
export default Login;
