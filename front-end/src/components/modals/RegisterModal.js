import { React, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Form, Button, FormGroup, Label, Input, Alert } from "reactstrap";
import "./RegisterModal.css";

function RegisterModal({ setOpenModal }, props) {
  const account = useSelector((state) => state.account);
  console.log("account from modal: ", account);

  const cleanClient = {
    clientName: "",
    clientAddress: "",
    employeeNumber: "",
    status: "",
    userId: account.user_id,
  };

  const [client, setClient] = useState({ ...cleanClient });
  const [clients, setClients] = useState([cleanClient]);
  const [response, setResponse] = useState({});

  const baseUrl = "http://localhost:3003/api/clients";

  const handleFieldChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleRegisterClient = () => {
    axios.post(baseUrl, client).then((resp) => {
      console.log("After insertion: ", resp.data);

      setResponse(resp.data);

      if (resp.data.success) {
        setClient(cleanClient);
      }
      //props.history.push("/clients", client);
    });

    setClients([...clients, client]);
    console.log("Client list", clients);

    // const newClientList = clients.slice();
    // newClientList.push(client);
    // setClients(...clients, newClientList);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h4>Client Registration Form</h4>
          {response && response.success && (
            <Alert className="successMsg" variant="success">
              {response.message}
            </Alert>
          )}
          {response && response.success === false ? (
            <Alert className="errorMsg" variant="danger">
              {response.message}
            </Alert>
          ) : null}
        </div>
        <div className="body">
          <div>
            <Form className="signup-form">
              <FormGroup>
                <Label>Client Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Client Name"
                  name="clientName"
                  value={client.clientName}
                  onChange={handleFieldChange}
                />
                {/* {Object.keys(nameError).map((key) => {
                  return <div style={{ color: "red" }}>{nameError[key]}</div>;
                })} */}
              </FormGroup>

              <FormGroup>
                <Label> Client Address </Label>
                <Input
                  type="text"
                  id="clientAddress"
                  placeholder="Client Address"
                  name="clientAddress"
                  value={client.clientAddress}
                  onChange={handleFieldChange}
                />
                {/* {Object.keys(usernameError).map((key) => {
                  return (
                    <div style={{ color: "red" }}>{usernameError[key]}</div>
                  );
                })} */}
              </FormGroup>

              <FormGroup>
                <Label>Employee Number</Label>
                <Input
                  type="text"
                  id="employeeNumber"
                  placeholder="Employee Number"
                  name="employeeNumber"
                  value={client.employeeNumber}
                  onChange={handleFieldChange}
                />
                {/* {Object.keys(emailError).map((key) => {
                  return <div style={{ color: "red" }}>{emailError[key]}</div>;
                })} */}
              </FormGroup>

              <FormGroup>
                <Label>Status</Label>
                <select
                  className="form-control"
                  name="status"
                  value={client.status}
                  onChange={handleFieldChange}
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">InActive</option>
                </select>
                {/* {Object.keys(roleError).map((key) => {
                  return <div style={{ color: "red" }}>{roleError[key]}</div>;
                })} */}
              </FormGroup>

              <FormGroup>
                <Input
                  type="hidden"
                  id="userId"
                  name="userId"
                  value={client.userId}
                  onChange={handleFieldChange}
                />
                {/* {Object.keys(passwordError).map((key) => {
                  return (
                    <div style={{ color: "red" }}>{passwordError[key]}</div>
                  );
                })} */}
              </FormGroup>
            </Form>
          </div>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={handleRegisterClient}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
