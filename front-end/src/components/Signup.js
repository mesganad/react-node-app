import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import Axios from "axios";
import { url } from "../config";

const Signup = (props) => {
  // const dispatch = useDispatch();

  const cleanAccount = { name: "", username: "", role: "", password: "" };
  const [account, setAccount] = useState(cleanAccount);

  //validation
  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});

  const handleCreate = (e) => {
    e.preventDefault();

    const isValid = formValidation();
    if (isValid) {
      Axios.post(`${url}/api/signup`, account)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });

      // dispatch({ type: "create", account: account });
      props.history.push("/login", account);
    }
    setAccount(cleanAccount);
  };
  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};

    let isValid = true;
    if (account.username.trim().length < 3) {
      usernameErr.nameShort = "Username should be atleast 3 characters";
      isValid = false;
    }
    if (account.username.trim().length > 10) {
      usernameErr.nameShort = "Username should be atmost 10 characters";
      isValid = false;
    }
    if (account.password.trim().length < 3) {
      passwordErr.nameShort = "Password should be atleast 3 characters";
      isValid = false;
    }
    setUsernameError(usernameErr);
    setPasswordError(passwordErr);
    return isValid;
  };

  // handleChange
  const handleFieldChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h2>Create Account</h2>

      <div>
        <form onSubmit={handleCreate}>
          <div>
            Name
            <input
              type="text"
              id="name"
              placeholder="name"
              name="name"
              value={account.name}
              onChange={handleFieldChange}
            />
            {/* {Object.keys(usernameError).map((key) => {
              return <div style={{ color: "red" }}>{usernameError[key]}</div>;
            })} */}
          </div>
          <div>
            Username
            <input
              type="text"
              id="username"
              placeholder="username"
              name="username"
              value={account.username}
              onChange={handleFieldChange}
            />
            {Object.keys(usernameError).map((key) => {
              return <div style={{ color: "red" }}>{usernameError[key]}</div>;
            })}
          </div>
          <div>
            Pick Role
            <select value={account.role} onChange={handleFieldChange}>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div>
            Password
            <input
              type="text"
              id="password"
              placeholder="password"
              name="password"
              value={account.password}
              onChange={handleFieldChange}
            />
            {Object.keys(passwordError).map((key) => {
              return <div style={{ color: "red" }}>{passwordError[key]}</div>;
            })}
          </div>
          <button type="submit" id="addBtn">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
