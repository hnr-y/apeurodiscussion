import React from 'react';
import styled from 'styled-components';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  top:0;
  li {
    padding: 18px 10px;
  }

  @media {
    flex-flow: column nowrap;
    background-color: #292C2E;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0%)' : 'translateX(-100%)'};
    border: solid;
    border-color:blue;
    left: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    li {
      color: #fff;
    }
  }
`;

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      <li>Home</li>
      <li>About Us</li>
      <li>Contact Us</li>
      <li>Sign In</li>
      <li>Sign Up</li>
    </Ul>
  )
}

export default RightNav
