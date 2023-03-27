import { Link, useNavigate } from "react-router-dom"
import BasicDropdown from "./BasicDropdown";
import { useState } from "react";
import { useEffect } from "react";
import Burger from "./Burger";
import io from 'socket.io-client';
import styled from 'styled-components';

let Ul = styled.ul
    `.trigger-button {
  position: relative;
  text-align: center;
  margin-bottom: 2vh;
  width: 96vw;
  height: 4vh;
  background: #292C2E;
  color: #fff;
  font-size: 4vh;
  border: none;
  border-right: 1px solid #5f6368;
  /* width: 200px; */
}

.dropdown-wrapper {
  position: relative;
  margin-left: 2vw;
  border: 1px solid #5f6368;
  margin-top: 2vh;
  width: 96vw;
  z-index: 997;
  background: #292C2E;

}

.dropdown-wrapper .dropdown {
  background: #292C2E;
  position: relative;
  font-size: 3vh;
  display: flex;
  align-items: center;
}

ul.notactive {
  background: #292C2E;
  font-family: specialhelvetica;
  text-align: center;
  position: relative;
  list-style: none;
  font-size: 3vh;
  overflow: hidden;
  height: 0px;
  transition: height 0.3s ease;
  overflow-y: hidden
}

ul.active {
  font-family: specialhelvetica;
  text-align: center;
  background: #292C2E;
  list-style: none;
  font-size: 3vh;
  overflow: hidden;
  height: 13vh;
  overflow: auto;
  position: relative;
  transition: height 0.3s ease;
  overflow-y: hidden
}

li {
  position: relative;
  margin-bottom: 2px;
}

li:hover {
  position: relative;
  font-size: 4vh;
  cursor: pointer;

}
div.djwNcy{
    position:relative;
}
`
const Intermediate = () => {
    document.body.style.background = '#292C2E'
    const [hDropdown, sethDropdown] = useState(false)
    const [cDropdown, setcDropdown] = useState(false)
    const [discussions, setDiscussions] = useState({})
    const hughes_period = ["Period 2", "Period 4", "Period 6"];
    const ceran_period = ["Period 1", "Period 5"];
    const socket = io('https://apeuro.app/', { path: '/server'})
    let navigate = useNavigate()
    useEffect(() => {
        socket.on('connect', () => {
            console.log('aaaaaaaaaa')
            socket.emit('get_discussions')
            socket.on('discussions', (data) => {
                var status = data
                let d = ["hughes_2", "hughes_4", "hughes_6", "ceran_1", "ceran_5"]
                for (var i = 0; i < d.length; i++) {
                    if (status[d[i]]['status'] == "active" || status[d[i]]['status'] == "paused") {
                        document.querySelectorAll('button')[i].style.display = "block"
                    } else {
                        document.querySelectorAll('button')[i].style.display = "none"
                    }
                    // console.log(discussions)
                }
                console.log(discussions)
            })
        })
        document.querySelector("li[class='HughesPeriod 2']").addEventListener("click", function () {
            navigate('/past/hughes/2/')
        })
        document.querySelector("li[class='HughesPeriod 4']").addEventListener("click", function () {
            navigate('/past/hughes/4/')
        })
        document.querySelector("li[class='HughesPeriod 6']").addEventListener("click", function () {
            navigate('/past/hughes/6/')
        })
        document.querySelector("li[class='CeranPeriod 1']").addEventListener("click", function () {
            navigate('/past/ceran/1/')
        })
        document.querySelector("li[class='CeranPeriod 5']").addEventListener("click", function () {
            navigate('/past/ceran/5/')
        })

    })

    return (
        <Ul>
            <div >
                <Burger></Burger>

                <p style={{ position: "relative", fontFamily: 'specialhelvetica', color: "white", marginTop: "3%", marginBottom: '1%', marginLeft: "1%", fontSize: "4vh" }}>
                    Live Discussions
                </p>

                <button style={{ height: "7vh", position: "relative", border: "1px solid #5f6368", display: "none", fontSize: "4vh", marginBottom: "1%", width: "96%", marginLeft: "2%" }} onClick={() => { navigate("/current/hughes/2/leaderboard") }}>
                    Hughes Period 2
                </button>
                <button style={{ height: "7vh", border: "1px solid #5f6368", display: "none", fontSize: "4vh", marginBottom: "1%", width: "96%", marginLeft: "2%" }} onClick={() => { navigate("/current/hughes/4/leaderboard") }}>
                    Hughes Period 4
                </button>
                <button style={{ height: "7vh", border: "1px solid #5f6368", display: "none", fontSize: "4vh", marginBottom: "1%", width: "96%", marginLeft: "2%" }} onClick={() => { navigate("/current/hughes/6/leaderboard") }}>
                    Hughes Period 6
                </button>

                <button style={{ border: "1px solid #5f6368", display: "none", fontSize: "4vh", marginBottom: "1%", width: "96%", marginLeft: "2%" }} onClick={() => { navigate("/current/ceran/1/leaderboard") }}>
                    Ceran Period 1
                </button>
                <button style={{ border: "1px solid #5f6368", display: "none", fontSize: "4vh", marginBottom: "1%", width: "96%", marginLeft: "2%" }} onClick={() => { navigate("/current/ceran/5/leaderboard") }}>
                    Ceran Period 5
                </button>
                <p style={{ fontFamily: 'specialhelvetica', color: "white", marginLeft: "1%", fontSize: "4vh" }}>
                    Past Discussions
                </p>
                <BasicDropdown className="trigger-button"
                    showDropdown={hDropdown}
                    setShowDropdown={() => sethDropdown(!hDropdown)}
                    items={hughes_period}
                    t="Hughes"

                />
                <BasicDropdown className="trigger-button"
                    showDropdown={cDropdown}
                    setShowDropdown={() => setcDropdown(!cDropdown)}
                    items={ceran_period}
                    t="Ceran"
                />
            </div>
        </Ul>
    )
}

export default Intermediate;
