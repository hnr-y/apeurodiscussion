import { Link } from "react-router-dom";
import io from 'socket.io-client';

const Recorder = () => {
    document.body.style.background = '#292C2E'
    let size
    let students
    const socket = io('https://APEURODISCUSSIONLEADERBOARD.edwinhou.repl.co');
    var database_data
    socket.on('connect', (data) => {
        console.log("connected to socket")
        socket.emit('get_database')
    })
    socket.on('update_page', (data) => {
        // students.sort(compare)
        // students.sort(compare)
        database_data = data
        if (database_data.length !== students.length) {
            document.querySelector('div.recorder').innerHTML = ''
            students = database_data
            build_page()
        }
        else {
            students = database_data
            for (let i = 0; i < students.length; i++) {
                
                document.getElementsByClassName(students[i].name)[0].getElementsByClassName(students[i].name + 'score')[0].innerHTML = "Score: " + students[i].points

            }
        }

    })

    socket.on('all_data', (data) => {
        students = data
        build_page()
    })


    function find_squares(x, y, n) {
        var ratio = x / y;
        var ncols_float = Math.sqrt(n * ratio);
        var nrows_float = n / ncols_float;

        // Find best option filling the whole height
        var nrows1 = Math.ceil(nrows_float);
        var ncols1 = Math.ceil(n / nrows1);
        while (nrows1 * ratio < ncols1) {
            nrows1++;
            ncols1 = Math.ceil(n / nrows1);
        }
        var cell_size1 = y / nrows1;

        // Find best option filling the whole width
        var ncols2 = Math.ceil(ncols_float);
        var nrows2 = Math.ceil(n / ncols2);
        while (ncols2 < nrows2 * ratio) {
            ncols2++;
            nrows2 = Math.ceil(n / ncols2);
        }
        var cell_size2 = x / ncols2;

        // Find the best values
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

    function compare(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }
    function build_page() {
        let squares = find_squares(window.innerWidth, window.innerHeight, students.length)
        let rows
        let column
        rows = squares[0]
        column = squares[1]
        size = squares[2] * 3 / 4
        let count = 0
        for (let j = 0; j < rows; j++) {
            for (let i = 0; i < column; i++) {
                try {
                    var box = document.createElement('div');
                    var subtract = document.createElement('div');
                    var name = document.createElement('p')
                    var score = document.createElement('p')

                    // var absent = document.createElement('div')

                    box.style = 'width:' + size + 'px;height:' + size + 'px;border:1px solid #5f6368;position:absolute; margin-top:' + ((j * (size * 6 / 5)) + (window.innerHeight - rows * (size * 6 / 5)) / 2) + 'px;margin-left:' + (i * (size * 6 / 5) + (window.innerWidth - column * (size * 6 / 5)) / 2) + 'px;display: flex; justify-content: center; align-items: center;text-align: center'
                    box.style.borderRadius = '15px';
                    // box.style.backgroundColor = '#6c6f72'

                    subtract.style = "width:" + parseInt(box.style.width) / 5 + 'px;height:' + parseInt(box.style.width) / 5 + 'px;margin-top:' + parseInt(box.style.height) * 5 / 8 + 'px; position:absolute;text-align: center; display: flex; align-items: center; justify-content:center'
                    subtract.style.borderRadius = '50%'
                    subtract.style.border = '4px solid #5f6368'
                    subtract.style.fontSize = parseInt(box.style.width) / 6 + 'px'
                    subtract.style.color = '#5f6368'
                    subtract.textContent = 'x'
                    subtract.style.fontFamily = 'specialhelvetica'                    
                    subtract.style.fontWeight= 'bold'
                    // subtract.onmouseover = function(){
                    //     subtract.style.backgroundColor = 'red'
                    // }
                    subtract.className = students[count].name + "sub"
                    // absent.style = "width:" + parseInt(box.style.width) / 8 + 'px;height:' + parseInt(box.style.height) / 8 + 'px; background-color:blue;margin-top:' + parseInt(box.style.height) * 5 / 8 + 'px;position:absolute;z-index:999'
                    // absent.innerHTML = 'X'
                    // absent.style.marginLeft = -parseInt(box.style.width) / 2 - parseInt(box.style.width) / 4 + 'px'
                    // absent.className = students[count].name + "absent"
                    // absent.style.fontSize = parseInt(box.style.width) * 0.1 + 'px'
                    // absent.style.marginLeft = '10px'
                    box.className = students[count].name
                    name.innerHTML = box.className
                    name.style.fontFamily = "specialhelvetica"
                    name.style.fontSize = size * 0.15 + 'px'
                    name.style.color = 'white'
                    name.style.fontWeight = '500'
                    score.innerHTML = 'Score: ' + students[count].points
                    score.style.position = 'absolute'
                    score.style.marginTop = '-50%'
                    score.className = students[count].name + "score"
                    score.style.fontFamily = 'specialhelvetica'
                    score.style.color = 'white'
                    box.onselectstart = function () { return false }
                    box.appendChild(name)
                    box.appendChild(subtract)
                    box.appendChild(score)
                    // box.appendChild(absent)
                    document.querySelector('div.recorder').appendChild(box)
                    count += 1
                }
                catch {

                }
            }
        }
        for (let i = 0; i < students.length; i++) {

            document.getElementsByClassName(students[i].name)[0].addEventListener('click', function (event) {

                socket.emit('update_data', [students[i].id, "points", students[i].points += 1])
                document.getElementsByClassName(students[i].name)[0].style.backgroundColor = 'green'
                setTimeout(function () {
                    document.getElementsByClassName(students[i].name)[0].style.backgroundColor = "#292C2E";  // Change the color back to the original
                }, 300);

            })
            document.getElementsByClassName(students[i].name + 'sub')[0].addEventListener('click', function (event) {

                event.stopPropagation()
                socket.emit('update_data', [students[i].id, "points", students[i].points -= 1])

                document.getElementsByClassName(students[i].name)[0].style.backgroundColor = 'red'
                setTimeout(function () {
                    document.getElementsByClassName(students[i].name)[0].style.backgroundColor = "#292C2E";  // Change the color back to the original
                }, 300);

            })
            document.getElementsByClassName(students[i].name + 'sub')[0].addEventListener('mouseover', function (event) {
                document.getElementsByClassName(students[i].name+'sub')[0].style.backgroundColor = 'red'
            })
            document.getElementsByClassName(students[i].name + 'sub')[0].addEventListener('mouseleave', function (event) {
                document.getElementsByClassName(students[i].name+'sub')[0].style.backgroundColor = '#292C2E'
            })
        }
    }

    return (
        <div>
            {/* <Link style={{ marginLeft: 100 }} to="/">home</Link>
            <Link style={{ marginLeft: 100 }} to="/recorder">recorder</Link>
            <Link style={{ marginLeft: 100 }} to="/leaderboard">leaderboard</Link> */}
            <h1 style={{ textAlign: "center", fontSize: "8vh", marginTop: 0, marginBottom: 0 , fontFamily: 'specialhelvetica'}}>
                AP European <span style={{ color: "white" }}>History</span>
            </h1>
            <div className="recorder" style={{
                minWidth: "100vh", minHeight: "50vh", background: "#292C2E", display: "grid",
                gridTemplateColumns: "auto auto auto"
            }}>
        </div>
        </div >
    )
}

export default Recorder