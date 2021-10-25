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
    const resp = await axios.post(`${url}/api/signin`, user);

    localStorage.setItem("user", JSON.stringify(resp.data));

    setRresponse(resp.data);

    dispatch({ type: "login", token: resp.data.token });

    props.history.push("/admin", user.username);
  };

  return (
    <div>
      <h2> Welcome to Login Page </h2>
      <div className="login">
        <div>
          <label>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};
export default Login;
