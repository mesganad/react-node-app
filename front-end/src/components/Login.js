import React from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { url } from "../config";

const initUser = { username: "", password: "" };

const Login = (props) => {
  const [user, setUser] = React.useState({ ...initUser });
  const [response, setRresponse] = React.useState({});
  const dispatch = useDispatch();

  const account = props.location.state;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    console.log(user);
    const resp = await axios.post(`${url}/api/signin`, user);
    console.log("returned data: ", resp.data);
    setRresponse(resp.data);
    dispatch({ type: "login", token: resp.data.token });

    console.log("while dispatching: ", resp.data.token);

    props.history.push("/admin", user.username);
  };

  return (
    <Container>
      <h2> Welcome to Login Page, {account.name} </h2>
      <div className="login">
        <lable>Username</lable>
        <input
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <br />

        <label>Password</label>
        <input
          type="text"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <br />

        <button onClick={handleLogin}>Login</button>
        <br />
        <div>
          <button>Signup</button>
        </div>
      </div>
    </Container>
  );
};
export default Login;
