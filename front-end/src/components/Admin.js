import React from "react";

import { useSelector } from "react-redux";

const Admin = (props) => {
  const username = props.location.state;
  const myToken = useSelector((state) => state.token);
  console.log("This is from redux store: ", myToken);
  return (
    <div>
      <h2>{myToken}</h2>
      <h2> Welcome {username} </h2>
    </div>
  );
};
export default Admin;
