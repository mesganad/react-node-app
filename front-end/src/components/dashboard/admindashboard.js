import "./dashboard.css";
import styled from 'styled-components';

import React from "react";
import { Container } from "reactstrap";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

function AdminDashboard() {
  let loginData = JSON.parse(localStorage.getItem("user"));
  return (

    <MyContainer>
        <Sidebar />
        <MainContent />
    </MyContainer>
  );
}
const MyContainer = styled.div`
display: flex;
height: 97vh;
background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
border-radius: 2rem
`
export default AdminDashboard;