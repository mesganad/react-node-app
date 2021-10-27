import React from "react";
import "./CreospanAdmin.css";

const CreospanAdmin = (props) => {
  const { username } = props.location.state;

  return (
    <div className="creoadmin">
      <h3> Welcome to Creospan Admin Profile, {username}</h3>
      <a href="/creoadmin">Add Client</a>
      <br />
      <a href="/signup">Add User</a> <br />
      <a href="/creoadmin">View Clients</a>
    </div>
  );
};
export default CreospanAdmin;
