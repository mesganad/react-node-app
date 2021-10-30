import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import Axios from "axios";
import { Form, Button, FormGroup, Label, Input, Alert } from "reactstrap";
import { url } from "../../config";
import "./Signup.css";

const Signup = (props) => {
  // const dispatch = useDispatch();

  const cleanAccount = {
    name: "",
    username: "",
    role: "",
    password: "",
    email: "",
  };
  const [account, setAccount] = useState(cleanAccount);
  const [signupResponse, setSignupResponse] = useState({});

  //validation
  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [nameError, setNameError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [roleError, setRoleError] = useState({});

  const handleCreate = (e) => {
    e.preventDefault();

    const isValid = formValidation();
    if (isValid) {
      Axios.post(`${url}/api/signup`, account)
        .then((response) => {
          setSignupResponse(response.data);
          console.log(signupResponse);
          setAccount(cleanAccount);
        })
        .catch((err) => {
          console.log(err);
        });

      // dispatch({ type: "create", account: account });
      //props.history.push("/signup");
    }
  };
  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    const nameErr = {};
    const emailErr = {};
    const roleErr = {};

    let isValid = true;
    if (account.name.trim().length < 3 && account.name.trim().length > 0) {
      nameErr.nameShort = "Name should be atleast 3 characters";
      isValid = false;
    }
    if (account.name.trim() === null || account.name.trim() === "") {
      nameErr.nameEmpty = "Name cannot be empty";
      isValid = false;
    }
    if (account.name.trim().length > 30) {
      nameErr.nameLong = "Name should be atmost 30 characters";
      isValid = false;
    }
    if (
      account.username.trim().length < 3 &&
      account.username.trim().length > 0
    ) {
      usernameErr.userNameShort = "Username should be atleast 3 characters";
      isValid = false;
    }
    if (account.username.trim() === null || account.username.trim() === "") {
      usernameErr.usernameEmpty = "Username cannot be empty";
      isValid = false;
    }
    if (account.username.trim().length > 10) {
      usernameErr.userNameLong = "Username should be atmost 10 characters";
      isValid = false;
    }
    if (account.role.trim() === null || account.role.trim() === "") {
      roleErr.roleEmpty = "Role cannot be empty";
      isValid = false;
    }
    if (
      account.password.trim().length < 3 &&
      account.password.trim().length > 0
    ) {
      passwordErr.passwordShort = "Password should be atleast 3 characters";
      isValid = false;
    }

    if (account.password.trim() === null || account.password.trim() === "") {
      passwordErr.passwordEmpty = "Password cannot be empty";
      isValid = false;
    }
    if (account.email.trim() === null || account.email.trim() === "") {
      emailErr.emailEmpty = "Email cannot be empty";
      isValid = false;
    }
    if (
      !(
        account.email.trim().includes("@") || account.email.trim().includes(".")
      )
    ) {
      emailErr.emailShort = "Invalid email address";
      isValid = false;
    }
    setUsernameError(usernameErr);
    setPasswordError(passwordErr);
    setNameError(nameErr);
    setEmailError(emailErr);
    setRoleError(roleErr);
    return isValid;
  };

  // handleChange
  const handleFieldChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {signupResponse && signupResponse.success && (
        <Alert className="successMsg" variant="success">
          {signupResponse.message}
        </Alert>
      )}

      <Form onSubmit={handleCreate} className="signup-form">
        <h2>Create Account</h2>
        <FormGroup>
          <Label>Full Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Full Name"
            name="name"
            value={account.name}
            onChange={handleFieldChange}
          />
          {Object.keys(nameError).map((key) => {
            return <div style={{ color: "red" }}>{nameError[key]}</div>;
          })}
        </FormGroup>

        <FormGroup>
          <Label> Username </Label>
          <Input
            type="text"
            id="username"
            placeholder="Username"
            name="username"
            value={account.username}
            onChange={handleFieldChange}
          />
          {Object.keys(usernameError).map((key) => {
            return <div style={{ color: "red" }}>{usernameError[key]}</div>;
          })}
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            type="text"
            id="email"
            placeholder="Email"
            name="email"
            value={account.email}
            onChange={handleFieldChange}
          />
          {Object.keys(emailError).map((key) => {
            return <div style={{ color: "red" }}>{emailError[key]}</div>;
          })}
        </FormGroup>

        <FormGroup>
          <Label>Role</Label>
          <select
            className="form-control"
            name="role"
            value={account.role}
            onChange={handleFieldChange}
          >
            <option value="">Select Role</option>
            <option value="creoadmin">Creospan Admin</option>
            <option value="clientadmin">Client Admin</option>
            <option value="employee">Employee</option>
          </select>
          {Object.keys(roleError).map((key) => {
            return <div style={{ color: "red" }}>{roleError[key]}</div>;
          })}
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={account.password}
            onChange={handleFieldChange}
          />
          {Object.keys(passwordError).map((key) => {
            return <div style={{ color: "red" }}>{passwordError[key]}</div>;
          })}
        </FormGroup>

        <Button
          type="submit"
          id="addBtn"
          className="signupButton btn-lg btn-dark btn-block"
        >
          Add User
        </Button>
      </Form>
    </div>
  );
};
export default Signup;
