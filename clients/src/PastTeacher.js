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
#back{
    position:absolute;
    align-self: start;
    margin-left:-80%;
    margin-top:10%;
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

#timePassed {
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

const PastTeacher = (inp) => {
    for (let i = 1; i < 9999; i++) {
        clearInterval(i);
    }
    let navigate = useNavigate()
    let period
    console.log(inp)
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
        document.querySelector('div#label').innerHTML = document.querySelector('div#label').innerHTML.replace('Period', 'Period ' + inp.period)
        socket.emit('get_discussions')
        socket.emit('get_past_dates')
        added = false
        document.querySelector('div#timePassed').style.opacity = 0.5
        document.querySelector('div#pauseButton').style.opacity = 0.5
        document.querySelector('div#startButton').style.opacity = 0.5
        document.querySelector('div#stopButton').style.opacity = 0.5
        document.querySelector('div#startButton').addEventListener('click', () => {
            if (document.querySelector('div#startButton').style.opacity == 1) {
                socket.emit('spreadsheet', students, " " + inp.teacher + ' Period ' + inp.period)
                window.open("https://docs.google.com/spreadsheets/d/1G7UXpGoB2aIe-chtI8h-vu97Pww1ST_hesnLx-rP2CU")
            }
        })
        document.querySelector('div#back').addEventListener('click', () => {
            navigate('/teacher')
        })
        document.querySelector('div#stopButton').addEventListener('click', () => {
            if (document.querySelector('div#stopButton').style.opacity == 1) {
                action = 'stop'
                socket.emit('get_discussions')
            }

        })
    }, []);
    document.body.style.background = '#292C2E'
    // const socket = io('http://54.151.75.108/', { path: '/server' });
    const socket = io('https://apeuro.app/', { path: '/server'})
    const [aut, setAut] = useState("hidden")
    const [s, setS] = useState("visible")
    socket.on('connect', (data) => {
        window.addEventListener('storage', () => {
            // socket.emit('authentication', teacher_name)
            window.location.reload()
        });
        socket.on('past_dates', (data) => {
            let temp = eval(data)
            for (let i = 0; i < temp.length; i++) {
                let div = document.createElement('div')
                div.className = "hover-underline-animation-large"
                div.style = "cursor: pointer;display:block"
                div.id = 'period'
                div.textContent = temp[i]
                div.addEventListener('click', () => {
                    period = temp[i]
                    document.querySelector('div#timePassed').textContent = temp[i]
                    socket.emit('get_past_data', inp.teacher, inp.period, period)
                })
                document.querySelector('div#periods').appendChild(div)
            }
        })

        socket.on('past_data', (data) => {
            document.querySelector('div#timePassed').style.opacity = 1
            document.querySelector('div#pauseButton').style.opacity = 1
            document.querySelector('div#startButton').style.opacity = 1
            document.querySelector('div#leaderboardContainer').innerHTML = ''
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
                document.querySelector('div#leaderboardContainer').appendChild(div)
            }
            document.querySelector('div#pauseButton').textContent = "Avg/" + sum / students.length
        })

        socket.emit('authentication', localStorage.getItem('name'))
        socket.on('auth', (data) => {
            if (data != "incorrect") {
                if (data[0] != "teacher") {
                    navigate("/")
                }
            }
            else {
                navigate("/")
            }
        })
    })
    useEffect(() => {

        let teacherName = localStorage.getItem('t_name').charAt(0).toUpperCase() + localStorage.getItem('t_name').slice(1);
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
                        <div id="back" style={{ cursor: "pointer" }}>←</div>
                        <div id="label">
                            Previous Discussions
                        </div>
                        <div id="periods">
                        </div>
                    </div>
                    <div id="controls">
                        <div id="periodSelection">
                            {/* <BasicDropdown className="trigger-button"
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
                            /> */}
                            {"Period " + inp.period}
                        </div>
                        <div id="timePassed">Date</div>
                        <div id='passed'>
                        </div>
                        <div id="pauseButton">- -</div>
                        <div id="startButton">View as Spreadsheet</div>
                        <div id="stopButton">Import To Canvas (WIP)</div>
                        <div id='leaderboardContainer'>
                        </div>
                    </div>
                </div>

                {/* <button className="submit" style={{ visibility: s, height: "60vh", width: "30vw", marginLeft: "40vw", marginTop: "20vh" }}>Push me to enter discussion data into a google spreadsheet</button> */}

            </Ul >
        </div >

    );
}

export default PastTeacher;
