import React from 'react';
import styled from 'styled-components';
import { Link} from "react-router-dom";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  top:0;

  @media {
    z-index:10;
    flex-flow: column nowrap;
    background-color: #292C2E;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0%)' : 'translateX(-100%)'};
    border: solid;
    border-color:#5f6368;
    border-left: 0;
    border-radius: 0 1vh 1vh 0;
    left: 0;
    height: 99vh;
    width: 20vw;
    // padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    li {
      color: #fff;
    }
  }
`;

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      
      <Link style = {{paddingTop: "10vh",fontFamily : "specialhelvetica", fontSize: "3vw", textDecoration: 'none', color: "white"}} to="/">&nbsp;&nbsp;&nbsp;Home</Link>
      <Link style = {{paddingTop: "5vh",fontFamily : "specialhelvetica", fontSize: "3vw", textDecoration: 'none', color: "white"}} to="/recorder">&nbsp;&nbsp;&nbsp;Record</Link>
      <Link style = {{paddingTop: "5vh",fontFamily : "specialhelvetica", fontSize: "3vw", textDecoration: 'none', color: "white"}} to="/leaderboard">&nbsp;&nbsp;&nbsp;Leaderboard</Link>
      <Link style = {{paddingTop: "5vh",fontFamily : "specialhelvetica", fontSize: "3vw", textDecoration: 'none', color: "white"}} to="/teacher">&nbsp;&nbsp;&nbsp;Account</Link>
      <Link style = {{paddingTop: "5vh",fontFamily : "specialhelvetica", fontSize: "3vw", textDecoration: 'none', color: "white"}} to="/share">&nbsp;&nbsp;&nbsp;Share</Link>
      <Link style = {{paddingTop: "5vh",fontFamily : "specialhelvetica", fontSize: "3vw", textDecoration: 'none', color: "white"}} to="/about">&nbsp;&nbsp;&nbsp;About</Link>
    </Ul>
  )
}

export default RightNav
