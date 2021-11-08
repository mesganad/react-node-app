import React from 'react'
import styled from 'styled-components'
import MyBadge from './MyBadge'
import {darkThemColor} from "./utils"
import {RiHomeLine, RiFileCopyLine} from "react-icons/ri";
import {FaWallet} from "react-icons/fa";
import {AiOutlinePieChart} from "react-icons/ri";
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     NavLink,
//   } from "react-router-dom";


function Sidebar(){

    return(
        <Container>
<ProfileContainer>
    <Avatar>
        RM
        </Avatar>
    <Name>Ruvimbo Magweregwede</Name>
    <MyBadge content="Software developer" />
</ProfileContainer>
<LinksContainer>
<Links>
<Link>
<RiHomeLine />
<h3>Dashboard</h3>
</Link>
</Links>
</LinksContainer>
        </Container>
    )
}
const Container = styled.div`
width: 24%;
height: 100% !important;
border-radius: 2rem;
background-color: #091322;
display: flex;
flex-direction: column;
align-items: center;
gap: 3rem;
`;
const ProfileContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;
const Avatar = styled.h1`
height: 7rem;
color: white;
border-radius;
margin-top: 20%;
`;
const Name = styled.h1`
color: white;
font: 1.5rem;
font-weight: 400;
margin: 0.8rem 0 5rem 0;
`;
const LinksContainer = styled.div`
background-color: ${darkThemColor};
height: 100%;
width: 100%;
border-radius: 2rem;
`;
const Links = styled.ul`
list-style-type: none;
display: flex;
flex-direction: column;
padding-top: 2rem;
height: 60%;
`;
const Link = styled.li`
margin-left: 25%;
margin-botton: 2rem;
display: flex;
gap: 1rem;
color: #e4e4e4;
cursor: pointer;
`;

const ContactContainer = styled.div`

`;

export default Sidebar