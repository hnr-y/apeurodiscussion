import { Link, useNavigate } from "react-router-dom"
import BasicDropdown from "./BasicDropdown";
import { useState } from "react";
import { useEffect } from "react";
import io from 'socket.io-client';
import Burger from "./Burger";
let compare = function (a, b) {
    if (a.points > b.points) {
        return -1;
    }
    if (a.points < b.points) {
        return 1;
    }
    return 0;
}
const PastLeaderboard = (inp) => {
    let students
    let navigate = useNavigate()
    document.body.style.background = '#292C2E'
    const socket = io('localhost:5000', { path: '/server' })
    useEffect(() => {
        socket.on('connect', (data) => {
            document.querySelector('p#past').addEventListener('click', () => {
                document.querySelector('div#l').style.display = 'none'
                document.querySelector('div#container').style.display = 'block'
                document.querySelector('p#past').textContent = document.querySelector('p#past').textContent.replace('←', '')
            })
            socket.emit('get_past_dates')
            socket.on('past_dates', (data) => {
                console.log(data)
                let temp = eval(data)
                for (let i = 0; i < temp.length; i++) {
                    let div = document.createElement('button')
                    div.style = "position: relative; border: 1px solid rgb(95, 99, 104); display: block; font-size: 4vh; width: 96%; margin-left: 2%; margin-top: 1%;"
                    div.textContent = temp[i]
                    console.log(inp)
                    div.addEventListener('click', () => {
                        socket.emit('get_past_data', inp.teacher, inp.period, div.textContent)
                    })
                    document.querySelector('div#container').appendChild(div)
                }

            })
            socket.on('past_data', (data) => {
                document.querySelector('div#l').style.display = 'block'
                document.querySelector('div#container').style.display = 'none'
                document.querySelector('p#past').textContent = '← '+document.querySelector('p#past').textContent
                students = data
                students.sort(compare)
                let sum = 0
                for (let i = 0; i < students.length; i++) {
                    sum += students[i].points
                    let text_size = "20px"
                    var div = document.createElement('div')
                    var name = document.createElement('p')
                    var number = document.createElement('p')
                    var raw_score = document.createElement('p')
                    var actual_score = document.createElement('p')
                    div.style = 'width: 97.48%;border-width:1px; border-style: solid;'
                    div.style.height = '6vh'
                    div.style.position = 'relative'
                    div.style.marginTop = "1vh";
                    div.style.marginLeft = "0.5vw"
                    div.style.borderRadius = "5px"
                    div.style.borderColor = '#5f6368'
                    div.style.position = 'relative'

                    div.className = students[i].name
                    name.innerText = students[i].name
                    name.style.fontSize = text_size
                    name.style.fontFamily = 'specialhelvetica'
                    name.style.marginLeft = '10vw'
                    name.style.position = 'absolute'
                    name.className = "name"
                    number.innerText = i + 1;
                    number.style.fontSize = text_size
                    number.style.fontFamily = 'specialhelvetica'
                    number.style.marginLeft = '1vw'
                    number.style.position = 'absolute'
                    raw_score.style.position = 'relative'
                    raw_score.style.float = 'right'
                    raw_score.innerText = students[i].points
                    raw_score.style.marginRight = '1vw'

                    raw_score.style.fontSize = text_size
                    raw_score.style.fontFamily = 'specialhelvetica'
                    raw_score.className = "raw_score"
                    div.style.color = 'white'
                    div.appendChild(name)
                    div.appendChild(raw_score)
                    div.appendChild(actual_score)
                    div.appendChild(number)
                    document.querySelector('div#leaderboard_container').appendChild(div)
                }
            })
        })
    }, [])

    return (
        <div>
            <Burger></Burger>
            <p id='past' className='hover-underline-animation-small' style={{ cursor: 'pointer', fontFamily: 'specialhelvetica', color: "white", marginTop: "4%", marginLeft: "1%", fontSize: "4vh", position: 'relative' }}>
                Past Discussions
            </p>
            <div id='container' style={{ display: "block" }}>
            </div>
            <div id='l' style={{ display: "none" }}>
                <div id='leaderboard_container' >
                </div>
            </div>

        </div>
    )
}

export default PastLeaderboard