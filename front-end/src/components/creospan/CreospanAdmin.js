import React from "react";
import "./CreospanAdmin.css";

const CreospanAdmin = (props) => {
  const username = "ruvi";
  return (
    <div className="creoadmin">
      <h3 data-testid="creoadmin">Welcome to Admin Dashboard, {username}</h3>
    </div>
  );
};
export default CreospanAdmin;
