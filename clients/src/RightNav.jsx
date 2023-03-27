import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import { useState } from 'react';
const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  top:0;
  z-index: 998;

  @media (any-pointer: fine) {
    z-index: 998;
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
    #link{
      font-size: 3vw;
      margin-left:10%;
    }
  }
    @media (any-pointer: coarse) {
      z-index: 998;
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
      width: 50vw;
      // padding-top: 3.5rem;
      transition: transform 0.3s ease-in-out;
      li {
        color: #fff;
      }
      #link{
        font-size: 3vh;
        margin-left:10%;
      }
  }
`;



const RightNav = ({ open }) => {
  const socket = io('http://54.151.75.108/', { path: '/server'})
  const [auth_teacher, setAuth_teacher] = useState("none")
  const [auth_recorder, setAuth_recorder] = useState("none")
  useEffect(() => {
    socket.on('connect', (data) => {
      var database_data
      socket.emit('authentication', localStorage.getItem('name'))
      socket.on('auth', (data) => {
        if (data != "incorrect") {
          if (data[0] == "teacher") {
            setAuth_teacher('block')
            setAuth_recorder('none')
          }
          else {
            if (data[0] == "student") {
              setAuth_recorder('block')
              setAuth_teacher('none')
              socket.emit('get_full_database')
            }
            else {
              setAuth_teacher('none')
              setAuth_recorder('none')
            }
          }
        }
        else {
          setAuth_teacher('none')
          setAuth_recorder('none')
        }
      })
      socket.on('full_data', (data) => {
        database_data = data
      })
    })
  })

  return (
    <Ul open={open}>
      <Link id='link' className='hover-underline-animation-small' style={{ width: 'fit-content', paddingTop: "20vh", fontFamily: "specialhelvetica", textDecoration: 'none', color: "white" }} to="/">Home</Link>
      <Link id='link' className='hover-underline-animation-small' style={{ width: 'fit-content', display: auth_recorder, paddingTop: "5vh", fontFamily: "specialhelvetica", textDecoration: 'none', color: "white" }} to="/recorder">Record</Link>
      <Link id='link' className='hover-underline-animation-small' style={{ width: 'fit-content', display: auth_teacher, paddingTop: "5vh", fontFamily: "specialhelvetica", textDecoration: 'none', color: "white" }} to="/teacher">Teacher</Link>
      <Link id='link' className='hover-underline-animation-small' style={{ width: 'fit-content', paddingTop: "5vh", fontFamily: "specialhelvetica", textDecoration: 'none', color: "white" }} to="/all">Leaderboard</Link>
      <Link id='link' className='hover-underline-animation-small' style={{ width: 'fit-content', paddingTop: "5vh", fontFamily: "specialhelvetica", textDecoration: 'none', color: "white" }} to="/share">Share</Link>
      <Link id='link' className='hover-underline-animation-small' style={{ width: 'fit-content', paddingTop: "5vh", fontFamily: "specialhelvetica", textDecoration: 'none', color: "white" }} to="/about">About</Link>
    </Ul>
  )
}

export default RightNav
