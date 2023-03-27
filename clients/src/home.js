import React from 'react';
import Burger from './Burger';
import Login from './Login';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
const Home = () => {
    const socket = io('http://54.151.75.108/', { path: '/server'})
    let navigate = useNavigate()
    useEffect(() => {
        let animation = window.bodymovin.loadAnimation({
            container: document.getElementById('animationBackground'),
            path: './sphere.json',
            render: 'svg',
            loop: true,
            autoplay: true,
        })
        document.getElementById('shareButton').onclick = function () {
            alert("share")
        };
        document.getElementById('aboutButton').onclick = function () {
            navigate('/about')
        };
        document.getElementById('leaderboard').onclick = () => {
            navigate('/all')
        }
    })
    socket.on('connect', () => {
        document.querySelector('button#signIn').addEventListener('click', () => {
            let code = prompt('Enter Code')
            socket.emit('authentication', code)
        })
        socket.on('auth', (data) => {
            if (data != "incorrect") {
                localStorage.clear()
                if (data[0] == "teacher") {
                    localStorage.setItem('name', data[1])
                    localStorage.setItem('is_teacher', true)
                    localStorage.setItem('t_name', data[2])
                }
                if (data[0] == "student") {
                    localStorage.setItem('name', data[1]['name'])
                    localStorage.setItem('teacher', data[1]['teacher'])
                    localStorage.setItem('period', data[1]['period'])
                    localStorage.setItem('is_teacher', false)
                }
                if (localStorage.getItem('is_teacher') == "false") {
                    navigate("/recorder")
                }
            }
        })
    })
    return (
        
            <div>
                <Burger></Burger>
                <p id="historyTag">AP European History</p>
                <button id="shareButton" className="hover-underline-animation-small">Share</button>
                <button id="aboutButton" className="hover-underline-animation-small">About</button>
                <button id="signIn" className="hover-underline-animation-large">
                    Record</button>
                <button id="leaderboard" className="hover-underline-animation-large">Leaderboard</button>
                <p id="trackerTag">Discussion <br />Tracker </p>
                <div id="animationBackground"></div>
            </div>
        

    )
}
export default Home;