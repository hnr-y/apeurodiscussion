import React from 'react';
import io from 'socket.io-client';
import Burger from './Burger';
import { useState } from 'react';
import Login from './Login';
import { useEffect } from 'react';
import styled from 'styled-components';
import BasicDropdown from './BasicDropdown';
import { useNavigate } from "react-router-dom"

const Ul = styled.ul`

#overAll {    
    
    width: 85vw;
    height: 85vh;
    // background-color: rgba(0, 0, 0, 0.955);
    margin-right: auto;
    margin-left: auto;
    margin: 0 auto;
    margin-top: 7.5vh;
    position: relative;
    font-size: 1.56247423vw;
}
#welcomeAndTime {
    text-align: center;
    width: 25.26vw;
    height: 18.61vh;
    background-color: #292C2E;
    position: relative;
    z-index: 996;
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    border-color: #373a3c;
    
}

#time {
    z-index: 998;
    color: white;
    font-family: "specialhelvetica";
    display: inline-block;
    left: 0px;
    position: absolute;
    top: 4.07383085vh;
    margin-left: 3.54160825vw;
    background-color: transparent;
}
#date {
    float: right;
    z-index: 997;
    color: white;
    font-family: "specialhelvetica";
    margin-top: 4.07383085vh;
    margin-right: 3.54160825vw;
    display: inline-block;
    background-color: transparent;
}

#greeting {
    z-index: 997;
    color: white;
    font-family: "specialhelvetica";
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 5.74039801vh;
    background-color: transparent;
}

#previousDiscussions {
    width: 25.26vw;
    height: 65.35vh;
    background-color: #292C2E;
    position: absolute;
    z-index: 997;
    margin-left: 0px;
    bottom: 0px;
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    border-color: #373a3c;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}
#label{
    background-color: transparent;
    align-self: start;
    position:absolute;
    margin-top:3vh;
    // width: 100%;
    // text-align: center;
    // margin: 0 auto;
    // margin-top: 3.61049724vh;    
}
#periods{
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // text-align: center;
    // margin-bottom: 10vh;
}

#period{
    margin-bottom: 2vh;
    display: none;
}
#controls {
    width: 59.375vw;
    height: 84.9vh;
    border-color: #373a3c;
    border-radius: 10px;
    border-width: 2px;
    border-style: solid;
    background-color: #292C2E;
    position: absolute;
    bottom: 0px;
    margin-left: 25.520833vw;
    z-index: 997;
}

#periodSelection {
    width: 21.145833vw;
    height: 9.97037vh;
    background-color: #292C2E;
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    border-color: #373a3c;
    z-index: 997;
    position: absolute;
    margin-left: 0.2702083vw;
    margin-top: 0.481481vh;    
    display: flex;
    justify-content: center;
    align-items: center;
}

#displayDate {
    width: 21.145833vw;
    height: 9.97037vh;
    background-color: #292C2E;
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    border-color: #373a3c;
    z-index: -1;
    position: absolute;
    margin-left: 0.2702083vw;
    margin-top: 11.433332vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

#pauseButton {
    width: 21.145833vw;
    height: 19.7251271vh;
    background-color: #292C2E;
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    border-color: #373a3c;
    z-index: -1;
    position: absolute;
    margin-left: 0.2702083vw;
    margin-top: 22.4296278vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

#startButton {
    width: 21.145833vw;
    height: 19.7251271vh;
    background-color: #292C2E;
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    border-color: #373a3c;
    z-index: -1;
    position: absolute;
    margin-left: 0.2702083vw;
    margin-top: 43.0259236vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
#stopButton {
    width: 21.145833vw;
    height: 19.7251271vh;
    background-color: #292C2E;
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    border-color: #373a3c;
    z-index: 997;
    position: absolute;
    margin-left: 0.2702083vw;
    bottom: 0.5702083vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
#leaderboardContainer {
    width: 36.895833vw;
    height: 83.358234vh;
    background-color: #292C2E;
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    border-color: #373a3c;
    z-index: 997;
    position: absolute;
    margin-left: 21.79134vw;
    bottom: 0.5702083vh;
    overflow: auto;
    scrollbar-width: none
}
.trigger-button {
    position: relative;
    text-align: center;
    width: 100%;
    height: 4vh;
    background: #292C2E;
    color: #fff;
    font-size: 1.56247423vw;
    border: none;
    
    /* width: 200px; */
  }
  
  .dropdown-wrapper {
    position: relative;
    width: 100%;
    z-index: 997;
    background: #292C2E;
  
  }
  
  .dropdown-wrapper .dropdown {
    background: #292C2E;
    position: relative;
    font-size: 1.56247423vw;
    display: flex;
    align-items: center;
  }
  
  ul.notactive {
    width:100%;  
    background: #292C2E;
    font-family: specialhelvetica;
    text-align: center;
    position: absolute;
    list-style: none;
    font-size: 1.56247423vw;
    overflow: hidden;
    height: 0px;
    transition: height 0.3s ease;
    
  }
  
  ul.active {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-style: solid;
    border-width: 2px;
    border-color: #373a3c; 
    border-top: none;
    width:100%;
    font-family: specialhelvetica;
    text-align: center;
    background: #292C2E;
    list-style: none;
    font-size: 1.56247423vw;
    overflow: hidden;
    overflow: auto;
    position: absolute;
    transition: height 0.3s ease;
    overflow-y: hidden;
    z-index:999;
  }
  
  li {
    width:100%;
    text-align: center;
    position: relative;
    font-size: 1.56247423vw;

  }
  
  li:hover {
    text-align: center;
    width:100%;
    position: relative;
    font-size: 2vw;
    cursor: pointer;
  }
`

const Teacher = () => {

    let navigate = useNavigate()
    let discussion_data
    let elapsed
    let added
    let teacher_name = localStorage.getItem('t_name')
    let action
    let students
    const [list, setList] = useState([])
    let compare = function (a, b) {
        if (a.points > b.points) {
            return -1;
        }
        if (a.points < b.points) {
            return 1;
        }
        return 0;
    }
    let per = 0
    useEffect(() => {

        socket.emit('get_discussions')
        added = false
        if (teacher_name.toLowerCase() == 'ceran') {
            document.querySelectorAll('div#period')[0].style.display = 'block'
            document.querySelectorAll('div#period')[4].style.display = 'block'
            setList([1, 5])

        }
        if (teacher_name.toLowerCase() == 'hughes') {
            document.querySelectorAll('div#period')[1].style.display = 'block'
            document.querySelectorAll('div#period')[3].style.display = 'block'
            document.querySelectorAll('div#period')[5].style.display = 'block'
            setList([2, 4, 6])

        }
        document.querySelector('div#displayDate').style.opacity = 0.5
        document.querySelector('div#pauseButton').style.opacity = 0.5
        document.querySelector('div#startButton').style.opacity = 0.5
        document.querySelector('div#stopButton').style.opacity = 0.5
        document.querySelector('div#pauseButton').addEventListener('click', () => {
            if (document.querySelector('div#pauseButton').style.opacity == 1) {
                action = 'pause'
                socket.emit('get_discussions')
            }
        })
        document.querySelector('div#startButton').addEventListener('click', () => {
            if (document.querySelector('div#startButton').style.opacity == 1) {
                action = 'start'
                socket.emit('get_discussions')
            }
        })
        document.querySelector('div#stopButton').addEventListener('click', () => {
            if (document.querySelector('div#stopButton').style.opacity == 1) {
                action = 'stop'
                socket.emit('get_discussions')
            }

        })
    }, []);

    const [pDropdown, setPDropdown] = useState(false)
    document.body.style.background = '#292C2E'
    // const socket = io('http://54.151.75.108/', { path: '/server' });
    const socket = io('http://54.151.75.108/', { path: '/server'})
    const [aut, setAut] = useState("hidden")
    const [s, setS] = useState("visible")
    socket.on('connect', (data) => {

        if (added == false) {
            for (let i = 0; i < document.querySelectorAll('ul li').length; i++) {
                document.querySelectorAll('ul li')[i].addEventListener('click', () => {
                    document.querySelector('div#displayDate').style.opacity = 1

                    per = document.querySelectorAll('ul li')[i].textContent
                    socket.emit('get_database', teacher_name, per)
                    document.querySelector('button.trigger-button').textContent = 'Period ' + per
                    socket.emit('get_discussions')
                })

                added = true
            }
        }
        window.addEventListener('storage', () => {
            // socket.emit('authentication', teacher_name)
            window.location.reload()
        });
        socket.on('discussions', (data) => {
            discussion_data = data
            if (per != 0 && action != undefined) {
                if (action == 'pause') {
                    socket.emit("del_code", teacher_name.toLocaleLowerCase(), per)
                    socket.emit('set_status', [teacher_name.toLowerCase() + '_' + per, 'paused'])
                    socket.emit('set_time', [teacher_name.toLowerCase() + '_' + per, -1])
                }
                if (action == 'start') {
                    let code = Math.floor(Math.random() * 1000000000)
                    alert("The recorder code is " + code)
                    socket.emit("add_code", code, teacher_name.toLocaleLowerCase(), per)
                    socket.emit('set_status', [teacher_name.toLowerCase() + '_' + per, 'active'])
                    socket.emit('set_time', [teacher_name.toLowerCase() + '_' + per, Date.now()])
                }
                if (action == 'stop') {
                    socket.emit("del_code", teacher_name.toLocaleLowerCase(), per)
                    socket.emit('set_status', [teacher_name.toLowerCase() + '_' + per, 'off'])
                    socket.emit('set_time', [teacher_name.toLowerCase() + '_' + per, -1])
                    var dateObj = new Date();
                    var month = dateObj.getMonth() + 1; //months from 1-12
                    var day = dateObj.getDate();
                    var year = dateObj.getFullYear();

                    let newdate = month + "/" + day + "/" + year;
                    socket.emit('transfer', teacher_name.charAt(0).toUpperCase() + teacher_name.slice(1), per, newdate)
                    console.log('stopped')
                }
                action = undefined
                socket.emit('get_discussions')
            }
            if (per != 0) {
                if (discussion_data[teacher_name.toLowerCase() + '_' + per]['status'] == 'off') {
                    document.querySelector('div#displayDate').style.opacity = 0.5
                    document.querySelector('div#pauseButton').style.opacity = 0.5
                    document.querySelector('div#startButton').style.opacity = 1
                    document.querySelector('div#stopButton').style.opacity = 0.5
                }
                if (discussion_data[teacher_name.toLowerCase() + '_' + per]['status'] == 'paused') {
                    document.querySelector('div#displayDate').style.opacity = 0.5
                    document.querySelector('div#pauseButton').style.opacity = 0.5
                    document.querySelector('div#startButton').style.opacity = 1
                    document.querySelector('div#stopButton').style.opacity = 1
                }
                if (discussion_data[teacher_name.toLowerCase() + '_' + per]['status'] == 'active') {
                    document.querySelector('div#displayDate').style.opacity = 1
                    document.querySelector('div#pauseButton').style.opacity = 1
                    document.querySelector('div#startButton').style.opacity = 0.5
                    document.querySelector('div#stopButton').style.opacity = 1
                }
                clearInterval(elapsed)
                elapsed = setInterval(function () {
                    if (discussion_data[teacher_name.toLowerCase() + '_' + per]['start_time'] == -1 || JSON.stringify(Date.now() - discussion_data[teacher_name.toLowerCase() + '_' + per]['start_time']) == 'null') {
                        try {
                            document.querySelector('div#displayDate').textContent = '- -'
                        } catch (error) {

                        }

                    }
                    else {
                        let e = Math.floor((Date.now() - discussion_data[teacher_name.toLowerCase() + '_' + per]['start_time']) / 1000)
                        let min = Math.floor(e / 60)
                        let sec = e % 60
                        let hour = Math.floor(e / 3600)
                        if (min < 10) {
                            min = '0' + min
                        }
                        if (sec < 10) {
                            sec = '0' + sec
                        }
                        if (hour < 10) {
                            hour = '0' + hour
                        }
                        document.querySelector('div#displayDate').textContent = hour + ':' + min + ':' + sec
                    }
                }, 200)
            }

        })
        socket.on('update_page', (data) => {
            var temp = []
            var t = teacher_name
            var p = per
            for (var i in data) {
                if (data[i]['period'] == p && data[i]['teacher'].toLowerCase() == t) {
                    temp.push(data[i])
                }
            }
            students = temp
            students.sort(compare)
            for (let i = 0; i < students.length; i++) {
                document.querySelector("div#leaderboardContainer").getElementsByTagName("div")[i].getElementsByClassName("name")[0].innerHTML = students[i].name
                document.querySelector("div#leaderboardContainer").getElementsByTagName("div")[i].getElementsByClassName("raw_score")[0].innerHTML = students[i].points
            }
        })
        socket.on('all_data', (data) => {
            document.querySelector('div#leaderboardContainer').innerHTML = ''
            let students = data
            students.sort(compare)
            for (let i = 0; i < students.length; i++) {
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
                document.querySelector('div#leaderboardContainer').appendChild(div)
            }
        })

        socket.emit('authentication', localStorage.getItem('name'))
        socket.on('auth', (data) => {
            if (data != "incorrect") {
                if (data[0] != "teacher") {
                    navigate('/')
                }
            }
            else {
                navigate('/')
            }
        })
    })
    useEffect(() => {
        let teacherName = teacher_name.charAt(0).toUpperCase() + teacher_name.slice(1);
        let date = new Date();
        let teacherHours = date.getHours();
        let greeting = ""
        if (4 <= teacherHours && teacherHours <= 11) {
            greeting = "Good Morning " + teacherName + "!"
        } else if (11 < teacherHours && teacherHours <= 17) {
            greeting = "Good Afternoon " + teacherName + "!"
        } else {
            greeting = "Good Evening " + teacherName
        };
        document.getElementById("greeting").innerHTML = greeting
        let d = new Date();
        let year = JSON.stringify(d.getFullYear())
        year = year.slice(2, 4)
        document.getElementById("date").innerHTML = d.getMonth() + 1 + "/" + d.getDate() + "/" + year
        date = new Date();
        let hours = date.getHours()
        let AMPM = "AM"
        let timeMinutes = date.getMinutes()
        if (hours >= 12) {
            hours -= 12
            AMPM = "PM"
        }
        if (hours == 0) {
            hours = 12
            AMPM = "AM"
        }
        if (timeMinutes < 10) {
            timeMinutes = "0" + timeMinutes
        }
        document.getElementById("time").innerHTML = hours + ":" + timeMinutes + " " + AMPM
        for (let i = 0; i < 7; i++) {
            document.querySelectorAll('div#period')[i].addEventListener('click', () => {
                navigate('/teacher/' + (i + 1))
            })
        }
        if (window.myInterval != undefined && window.myInterval != 'undefined') {
            window.clearInterval(window.myInterval);
            alert('Timer cleared with id' + window.myInterval);
        }
        setInterval(function () {
            let date = new Date();
            let hours = date.getHours()
            let AMPM = "AM"
            let timeMinutes = date.getMinutes()
            if (hours >= 12) {
                hours -= 12
                AMPM = "PM"
            }
            if (hours == 0) {
                hours = 12
                AMPM = "AM"
            }
            if (timeMinutes < 10) {
                timeMinutes = "0" + timeMinutes
            }
            try {
                document.getElementById("time").innerHTML = hours + ":" + timeMinutes + " " + AMPM
            } catch (error) {

            }

        }, 1000)
    })

    return (
        <div>
            <Ul>
                <Burger></Burger>
                <div id="overAll">
                    <div id="welcomeAndTime">
                        <div id="time">
                            <p></p>
                        </div>
                        <div id="date">
                            <p></p>
                        </div>
                        <div id="greeting">
                            <p></p>
                        </div>
                    </div>
                    <div id="previousDiscussions">
                        <div id="label">
                            Previous Discussions
                        </div>
                        <div id="periods">
                            <div id="period" style={{ cursor: "pointer" }} className="hover-underline-animation-large">
                                Period 1
                            </div>
                            <div id="period" style={{ cursor: "pointer" }} className="hover-underline-animation-large">
                                Period 2
                            </div>
                            <div id="period" style={{ cursor: "pointer" }} className="hover-underline-animation-large">
                                Period 3
                            </div>
                            <div id="period" style={{ cursor: "pointer" }} className="hover-underline-animation-large">
                                Period 4
                            </div>
                            <div id="period" style={{ cursor: "pointer" }} className="hover-underline-animation-large">
                                Period 5
                            </div>
                            <div id="period" style={{ cursor: "pointer" }} className="hover-underline-animation-large">
                                Period 6
                            </div>
                            <div id="period" style={{ cursor: "pointer" }} className="hover-underline-animation-large">
                                Period 7
                            </div>
                        </div>
                    </div>
                    <div id="controls">
                        <div id="periodSelection">
                            <BasicDropdown className="trigger-button"
                                showDropdown={pDropdown}
                                items={list}
                                setShowDropdown={() => {
                                    setPDropdown(!pDropdown)
                                    if (pDropdown == false) {
                                        document.querySelector('ul.notactive').style.height = document.querySelector('ul li').clientHeight * document.querySelectorAll('ul li').length + 10 + 'px'
                                    }
                                    else {
                                        document.querySelector('ul.active').style.height = '0px'
                                    }
                                }}
                                t="Period"
                            />
                        </div>
                        <div id="displayDate">- -</div>
                        <div id='passed'>
                        </div>
                        <div id="pauseButton">Pause</div>
                        <div id="startButton">Start</div>
                        <div id="stopButton">Stop</div>
                        <div id='leaderboardContainer'>
                        </div>
                    </div>
                </div>
                {/* <button className="submit" style={{ visibility: s, height: "60vh", width: "30vw", marginLeft: "40vw", marginTop: "20vh" }}>Push me to enter discussion data into a google spreadsheet</button> */}

            </Ul >
        </div >

    );
}

export default Teacher;