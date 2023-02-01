import React from 'react';
import io from 'socket.io-client';
import Burger from './Burger';
const  Teacher = ()=> {
	 document.body.style.background = '#292C2E'
	  const socket = io('http://54.151.75.108/', { path: '/server'});
  socket.on('connect', (data) => {
	              var pwd;
	                          while (pwd == null) { pwd = prompt("please enter the  password")
					                                  console.log(pwd)
					                                                socket.emit('authentication',pwd)}


	      socket.on('auth', (data)=>{
		              if(data=="correct"){
				       document.querySelector('button.submit').addEventListener("click", function(event){
					             event.stopPropagation()

					             socket.emit('spreadsheet')
					           })
				              }   
		                  else{
					  document.body.innerHTML='<div><h1 style="position:fixed; top: 10%; left: 50%; transform: translate(-50%, -50%); fontSize:10vh;">Wrong Password</h1><img src="https://media.tenor.com/s6Y_D_8viO4AAAAC/clash-royale-cry.gif" style="height:60vh; position:fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);"></img></div>'
				  }
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
