import { Link } from "react-router-dom";
import Login from "./Login";
import io from 'socket.io-client';
import "./recorder.css"
import Burger from "./Burger";
import { useNavigate } from 'react-router-dom';
import BasicDropdown from "./BasicDropdown";
import { useState } from "react";



const Recorder = () => {


    let state = 'alpha'
    let moveable = false
    let navigate = useNavigate()
    document.body.style.background = '#292C2E'
    let size
    let students = []
    // const socket = io('http://54.151.75.108/', { path: '/server'});
    const socket = io('https://apeuro.app/', { path: '/server'})
    const [aut, setAut] = useState("hidden")
    var database_data

    socket.on('connect', (data) => {
        let text_size
        if (document.documentElement.clientHeight / document.documentElement.clientWidth <= 2) {
            if (document.documentElement.clientHeight * 0.04 >= document.documentElement.clientWidth * 0.025) {
                text_size = document.documentElement.clientWidth * 0.025
            }
            else {
                text_size = document.documentElement.clientHeight * 0.04
            }
        }
        else {
            if (document.documentElement.clientHeight * 0.06 >= document.documentElement.clientWidth * 0.035) {
                text_size = document.documentElement.clientWidth * 0.035
            }
            else {
                text_size = document.documentElement.clientHeight * 0.06
            }
        }
        let size_unit = text_size

        document.querySelector('h1').style.fontSize = '1.5rem'
        document.querySelector('h1').style.height = size_unit * 2 + 'px'
        document.querySelector('h1').style.zIndex = 996
        window.addEventListener('storage', () => {
            navigate('/recorder')
        });
        socket.emit('authentication', localStorage.getItem('name'))
        socket.on("d_code", () => {
            navigate('/recorder')
        })
        socket.on('auth', (data) => {
            if (data != "incorrect") {
                if (data[0] == 'student') {
                    socket.emit('get_full_database')
                } else {
                    navigate("/")
                }
            }
            else {
                navigate("/")
            }
        })
        socket.on('full_data', (data) => {
            document.getElementsByClassName('alphabetical')[0].addEventListener('click', function (event) {
                event.stopPropagation()
                document.querySelector('div.recorder').innerHTML = ''
                build_page()
                state = 'alpha'
                moveable = false
                document.getElementsByClassName("alphabetical")[0].style.backgroundColor = 'green'
                document.getElementsByClassName("custom")[0].style.backgroundColor = '#292C2E'
                document.getElementsByClassName("moveable")[0].style.backgroundColor = '#292C2E'
                if (moveable == false) {
                    for (let i = 0; i < document.querySelectorAll("div[class=grid-cell]").length; i++) {
                        document.querySelectorAll("div[class=grid-cell]")[i].style.border = 'none'
                    }
                }
                else {
                    for (let i = 0; i < document.querySelectorAll("div[class=grid-cell]").length; i++) {
                        document.querySelectorAll("div[class=grid-cell]")[i].style.border = '1px solid #5f6368'
                    }
                }
            })
            document.getElementsByClassName('custom')[0].addEventListener('click', function (event) {
                event.stopPropagation()
                document.querySelector('div.recorder').innerHTML = ''
                build_page()
                document.getElementsByClassName("alphabetical")[0].style.backgroundColor = '#292C2E'
                state = 'custom'
                document.getElementsByClassName("custom")[0].style.backgroundColor = 'green'
                if (moveable == false) {
                    for (let i = 0; i < document.querySelectorAll("div[class=grid-cell]").length; i++) {
                        document.querySelectorAll("div[class=grid-cell]")[i].style.border = 'none'
                    }
                }
                else {
                    for (let i = 0; i < document.querySelectorAll("div[class=grid-cell]").length; i++) {
                        document.querySelectorAll("div[class=grid-cell]")[i].style.border = '1px solid #5f6368'
                    }
                }
            })
            document.getElementsByClassName('moveable')[0].addEventListener('click', function (event) {
                event.stopPropagation()
                if (state == "custom") {
                    if (document.getElementsByClassName("moveable")[0].style.backgroundColor == 'rgb(41, 44, 46)') {
                        document.getElementsByClassName("moveable")[0].style.backgroundColor = 'green'
                        moveable = true
                        for (let i = 0; i < document.querySelectorAll("div[class=grid-cell]").length; i++) {
                            document.querySelectorAll("div[class=grid-cell]")[i].style.border = '1px solid #5f6368'
                        }

                    }
                    else {
                        document.getElementsByClassName("moveable")[0].style.backgroundColor = '#292C2E'
                        moveable = false
                        if (moveable == false) {
                            for (let i = 0; i < document.querySelectorAll("div[class=grid-cell]").length; i++) {
                                document.querySelectorAll("div[class=grid-cell]")[i].style.border = 'none'
                            }
                        }
                        else {
                            for (let i = 0; i < document.querySelectorAll("div[class=grid-cell]").length; i++) {
                                document.querySelectorAll("div[class=grid-cell]")[i].style.border = '1px solid #5f6368'
                            }
                        }

                    }
                }
            })
            students = data
            // console.log(students)

            for (var i in students) {
                if (students[i]['period'] == localStorage.getItem('period') && students[i]['teacher'].toLowerCase() == localStorage.getItem('teacher')) {

                    socket.emit('get_database', students[i].teacher, students[i].period)
                    break
                }
            }
        })
        socket.on('update_page', (data) => {
            database_data = data
            var temp = []
            var t = ""
            var p = ""
            for (var i in database_data) {
                if (database_data[i]['period'] == localStorage.getItem('period') && database_data[i]['teacher'].toLowerCase() == localStorage.getItem('teacher')) {
                    t = database_data[i].teacher
                    p = database_data[i].period
                    break
                }
            }
            for (var i in database_data) {
                if (database_data[i]['period'] == p && database_data[i]['teacher'] == t) {
                    temp.push(database_data[i])
                }
            }

            if (temp.length !== students.length) {
                document.querySelector('div.recorder').innerHTML = ''
                students = temp
                build_page()
            }
            else {
                students = temp
                for (let i = 0; i < students.length; i++) {
                    document.getElementsByClassName(students[i].name)[0].getElementsByClassName(students[i].name + 'score')[0].innerHTML = "Score: " + students[i].points
                }
            }



        })
        socket.on('discussions', (data) => {
            let discussions = data
            let t
            let p
            for (var i in students) {
                if (students[i]['period'] == localStorage.getItem('period') && students[i]['teacher'].toLowerCase() == localStorage.getItem('teacher')) {
                    t = students[i].teacher
                    p = students[i].period
                    break
                }
            }
            let h = Math.max(document.querySelector('div.recorder').clientHeight)
            let w = Math.max(document.querySelector('div.recorder').clientWidth)
            let squares = find_squares(w, h, students.length)
            let rows
            let column
            rows = squares[0]
            column = squares[1]
            size = squares[2] * 0.8
            let count = 0
            for (var i = 0; i < rows * 2 + 4; i++) {
                for (var j = 0; j < column * 2 + 4; j++) {
                    var y = i * size / 2;
                    var x = j * size / 2;
                    let grid = document.createElement("div")
                    grid.style = "top: " + y + "px; left: " + x + 'px;'
                    grid.className = 'grid-cell'
                    grid.style.position = 'absolute'
                    grid.style.width = size / 2 + "px"
                    grid.style.height = size / 2 + "px"
                    grid.style.border = 'none'
                    document.querySelector('div.recorder').appendChild(grid)
                }
            }
            for (let j = 0; j < rows; j++) {
                for (let i = 0; i < column; i++) {
                    try {
                        var box = document.createElement('div');
                        var subtract = document.createElement('div');
                        var name = document.createElement('p')
                        var score = document.createElement('p')
                        // ((j * (size * 10 / 9)) + (h - rows * (size * 10 / 9)) / 2)
                        // (i * (size * 10 / 9) + (w - column * (size * 10 / 9)) / 2)
                        if (!Object.keys(discussions[t.toLowerCase() + '_' + p]["seating"]).includes(students[count].name) || state == 'alpha') {
                            console.log('first')
                            box.style = 'width:' + size + 'px;height:' + size + 'px;border:1px solid #5f6368;position:absolute;top:' + (j + 1) * size + 'px;left: ' + (i + 1) * size + 'px;display: flex; justify-content: center; align-items: center;text-align: center'
                        }
                        else {
                            // console.log(discussions[t.toLowerCase() + '_' + p]["seating"][students[count].name][0] * (size / 2))
                            box.style = 'width:' + size + 'px;height:' + size + 'px;border:1px solid #5f6368;position:absolute;top:' + discussions[t.toLowerCase() + '_' + p]["seating"][students[count].name][0] * (size / 2) + 'px;left: ' + discussions[t.toLowerCase() + '_' + p]["seating"][students[count].name][1] * (size / 2) + 'px;display: flex; justify-content: center; align-items: center;text-align: center'
                        }

                        dragElement(box)
                        box.style.borderRadius = '15px';
                        subtract.style = "width:" + parseInt(box.style.width) / 5 + 'px;height:' + parseInt(box.style.width) / 5 + 'px;margin-top:' + parseInt(box.style.height) * 5 / 8 + 'px; position:absolute;text-align: center; display: flex; align-items: center; justify-content:center'
                        subtract.style.border = '0px solid #5f6368'
                        subtract.style.fontSize = parseInt(box.style.width) / 6 + 'px'
                        subtract.style.color = '#5f6368'
                        subtract.textContent = 'X'
                        subtract.style.fontFamily = 'specialhelvetica'
                        subtract.style.fontWeight = 'bold'
                        subtract.style.backgroundColor = 'transparent'
                        subtract.className = students[count].name + "sub"
                        subtract.setAttribute('tag', 'subtract')
                        box.setAttribute("tag", "boxes")
                        box.className = students[count].name

                        name.innerHTML = box.className
                        name.style.fontFamily = "specialhelvetica"
                        name.style.fontSize = size * 0.12 + 'px'
                        name.style.color = 'white'
                        name.style.fontWeight = '500'
                        name.style.backgroundColor = 'transparent'
                        score.innerHTML = 'Score: ' + students[count].points
                        score.style.position = 'absolute'
                        score.style.marginTop = '-100%'
                        score.className = students[count].name + "score"
                        score.style.fontFamly = 'specialhelvetica'
                        score.style.color = 'white'
                        score.style.fontSize = size * 0.12 + 'px'
                        score.style.backgroundColor = 'transparent'
                        score.style.zIndex = 996
                        box.onselectstart = function () { return false }
                        box.appendChild(name)
                        box.appendChild(subtract)
                        box.appendChild(score)
                        document.querySelector('div.recorder').appendChild(box)
                        count += 1
                    }
                    catch {
                    }
                }
            }
            for (let i = 0; i < students.length; i++) {
                document.getElementsByClassName(students[i].name)[0].addEventListener('click', function (event) {

                    event.stopPropagation()
                    if (moveable == false) {
                        socket.emit('update_data', [students[i].name, "points", students[i].points += 1])
                        document.getElementsByClassName(students[i].name)[0].style.backgroundColor = 'green'
                        setTimeout(function () {
                            document.getElementsByClassName(students[i].name)[0].style.backgroundColor = "#292C2E";
                        }, 300);
                    }
                })
                document.getElementsByClassName(students[i].name + 'sub')[0].addEventListener('click', function (event) {
                    event.stopPropagation()
                    if (moveable == false) {
                        socket.emit('update_data', [students[i].name, "points", students[i].points -= 1])

                        document.getElementsByClassName(students[i].name)[0].style.backgroundColor = 'red'
                        setTimeout(function () {
                            document.getElementsByClassName(students[i].name)[0].style.backgroundColor = "#292C2E";
                        }, 300);
                    }

                })
                document.getElementsByClassName(students[i].name + 'sub')[0].addEventListener('mouseover', function (event) {
                    document.getElementsByClassName(students[i].name + 'sub')[0].style.color = 'red'
                })
                document.getElementsByClassName(students[i].name + 'sub')[0].addEventListener('mouseleave', function (event) {
                    document.getElementsByClassName(students[i].name + 'sub')[0].style.color = '#5f6368'
                })
            }

        })
        socket.on('all_data', (data) => {
            students = data
            document.querySelector('div.recorder').innerHTML = ''

            build_page()
        })
    })

    function find_squares(x, y, n) {
        var ratio = x / y;
        var ncols_float = Math.sqrt(n * ratio);
        var nrows_float = n / ncols_float;

        var nrows1 = Math.ceil(nrows_float);
        var ncols1 = Math.ceil(n / nrows1);
        while (nrows1 * ratio < ncols1) {
            nrows1++;
            ncols1 = Math.ceil(n / nrows1);
        }
        var cell_size1 = y / nrows1;

        var ncols2 = Math.ceil(ncols_float);
        var nrows2 = Math.ceil(n / ncols2);
        while (ncols2 < nrows2 * ratio) {
            ncols2++;
            nrows2 = Math.ceil(n / ncols2);
        }
        var cell_size2 = x / ncols2;

        var nrows, ncols, cell_size;
        if (cell_size1 < cell_size2) {
            nrows = nrows2;
            ncols = ncols2;
            cell_size = cell_size2;
        } else {
            nrows = nrows1;
            ncols = ncols1;
            cell_size = cell_size1;
        }
        return [nrows, ncols, cell_size]
    }
    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            if (moveable == true) {
                for (let i = 0; i < document.querySelectorAll('div[tag="boxes"]').length; i++) {
                    if (document.querySelectorAll('div[tag="boxes"]')[i].getAttribute('class') != elmnt.getAttribute('class')) {
                        document.querySelectorAll('div[tag="boxes"]')[i].style.opacity = '0.3'
                    }
                }
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                let x = Math.round((pos4 - pos2) / (size / 2) - 2) * (size / 2)
                let y = Math.round((pos3 - pos1) / (size / 2) - 2) * (size / 2)
                elmnt.style.top = x + "px";
                elmnt.style.left = y + "px";
                elmnt.style.zIndex = 997;
            }
        }
        function closeDragElement() {
            console.log('closed')
            let t
            let p
            for (var i in students) {
                if (students[i]['period'] == localStorage.getItem('period') && students[i]['teacher'].toLowerCase() == localStorage.getItem('teacher')) {
                    t = students[i].teacher
                    p = students[i].period
                    break
                }
            }
            let temp = {}
            for (let i = 0; i < document.querySelectorAll('div[tag="boxes"]').length; i++) {
                document.querySelectorAll('div[tag="boxes"]')[i].style.opacity = '1'
                temp[document.querySelectorAll('div[tag="boxes"]')[i].getAttribute('class')] = [Math.round(parseInt(document.querySelectorAll('div[tag="boxes"]')[i].style.top.replace("px", '')) / (size / 2)), Math.round(parseInt(document.querySelectorAll('div[tag="boxes"]')[i].style.left.replace('px', "")) / (size / 2))]
            }
            socket.emit('set_seating', [t.toLowerCase() + '_' + p, temp])
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    function build_page() {

        socket.emit('get_discussions')

    }
    return (
        <div>
            <div style={{ position: 'fixed', zIndex: 997, top: "0px" }}>
                <Burger></Burger>
                <h1 style={{ width: "100vw", textAlign: "center", fontSize: "5vh", paddingTop: '2.25vh', marginBottom: 0, fontFamily: 'specialhelvetica', position: "absolute" }}>
                    AP European History
                </h1>
            </div>

            <div className="recorder" style={{
                marginTop: "4%", position: "absolute",
                width: "90vw", height: "87vh", background: "#292C2E", display: "grid", marginLeft: "5%",
            }}>

            </div>
            <button style={{ borderRadius: "3px", background: "green", alignItems: "center", position: "absolute", top: "10%", width: "5%", height: "5%", right: "1%", display: "flex", justifyContent: "center" }} className="alphabetical">
                Alphabetical
            </button>
            <button style={{ borderRadius: "3px", background: "#292C2E", alignItems: "center", position: "absolute", top: "20%", width: "5%", height: "5%", right: "1%", display: "flex", justifyContent: "center" }} className="custom">
                Custom
            </button>
            <button style={{ borderRadius: "3px", background: "#292C2E", alignItems: "center", position: "absolute", top: "30%", width: "5%", height: "5%", right: "1%", display: "flex", justifyContent: "center" }} className="moveable">
                Moveable
            </button>
        </div >
    )
}

export default Recorder
