import { React, useState, useEffect } from "react";
import axios from "axios";
import "./Clients.css";
import RegisterModal from "../modals/RegisterModal";

function Clients(props) {
  const cleanClient = {
    client_name: "",
    client_address: "",
    employees_number: "",
    status: "",
    user_id: 0,
  };
  const baseUrl = "http://localhost:3003/api/clients";
  const [modalOpen, setModalOpen] = useState(false);
  const [clients, setClients] = useState([cleanClient]);
  const [client, setClient] = useState({ ...cleanClient });

  useEffect(() => {
    getAllClients();
  }, []);

  // const {client}=props.location.state;
  // setClients([...clients,client]);

  const getAllClients = () => {
    axios.get(baseUrl).then((resp) => {
      setClients(resp.data);
      console.log("Clients: ", clients);
    });
  };
  console.log("ClientList: ", clients);
  return (
    <div className="client_container">
      {!modalOpen && (
        <button
          className="openModalBtn"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Register Client
        </button>
      )}

      {modalOpen && <RegisterModal setOpenModal={setModalOpen} />}

      <div>
        <table>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Client Address</th>
              <th>Employees Number</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(clients).map((client, index) => (
              <tr key={index}>
                <td>{client.client_name}</td>
                <td>{client.client_address}</td>
                <td>{client.employees_number}</td>
                <td>{client.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clients;
