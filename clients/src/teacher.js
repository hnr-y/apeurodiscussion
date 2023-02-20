import React from 'react';
import io from 'socket.io-client';
import Burger from './Burger';
import { useState } from 'react';
import Login from './Login';
const Teacher = () => {
	document.body.style.background = '#292C2E'
	// const socket = io('http://54.151.75.108/', { path: '/server' });
	const socket = io('localhost:5000', { path: '/server' })
	const [aut, setAut] = useState("hidden")
	const [s, setS] = useState("visible")
	socket.on('connect', (data) => {
		window.addEventListener('storage', () => {
			// socket.emit('authentication', localStorage.getItem('name'))
			window.location.reload()
		});
		socket.emit('authentication', localStorage.getItem('name'))

		socket.on('auth', (data) => {
			if (data == "correct") {
				setAut('hidden')
				setS('visible')

				document.querySelector('button.submit').addEventListener("click", function (event) {
					event.stopPropagation()

					socket.emit('spreadsheet')
				})
			}
			else {
				setS('hidden')
				setAut('visible')
			}
		})


	})
	return (
		<div>

			<h1 style={{ visibility: aut, position: "fixed", top: "10%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "10vh", zIndex: 998 }}>Wrong Password</h1>
			<img src="https://media.tenor.com/s6Y_D_8viO4AAAAC/clash-royale-cry.gif" style={{ visibility: aut, height: "60vh", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 998 }}></img>
			<Burger></Burger>
			<Login style={{ marginLeft: "100px", marginRight: "auto" }}></Login>

			<h1 style={{ textAlign: "center", fontSize: "5vh", marginTop: 0, marginBottom: 0, fontFamily: 'specialhelvetica', marginLeft: "40%", position: "absolute" }}>
				AP European <span style={{ color: "white" }}>History</span>
			</h1>
			<button className="submit" style={{ visibility: s, height: "60vh", width: "30vw", marginLeft: "40vw", marginTop: "20vh" }}>Push me to enter discussion data into a google spreadsheet</button>

		</div >

	);
}

export default Teacher;