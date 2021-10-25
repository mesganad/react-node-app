import React from "react";

const Admin = (props) => {
  const username = props.location.state;
  return (
    <div>
      <h2> Welcome {username} </h2>
    </div>
  );
};
export default Admin;
