import React from 'react';
import io from 'socket.io-client';
import Burger from './Burger';
function Teacher() {
  document.body.style.background = '#292C2E'
  const socket = io('localhost:5000');
  socket.on('connect', (data) => {

    console.log("connected to socket")
    document.querySelector('button.submit').addEventListener("click", function(event){
      event.stopPropagation()
      
      socket.emit('spreadsheet')
    })
  })
  
  return (
    <div className="teacher" style={{ minHeight: "100vh", }}>
      <button className="submit" style={{height:"60vh", width:"30vw", marginLeft:"40vw", marginTop:"20vh"}}>Push me to enter discussion data into a google spreadsheet</button>
      <Burger></Burger>
    </div>
  );
}

export default Teacher;