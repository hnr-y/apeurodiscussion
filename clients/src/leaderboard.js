import { Link } from "react-router-dom";
import io from 'socket.io-client';
import Burger from './Burger';
import Login from './Login';


const Leaderboard = (teacher) => {
    let sort = "score"
    let students = []
    var database_data
    let compare = function (a, b) {
        if (a.points > b.points) {
            return -1;
        }
        if (a.points < b.points) {
            return 1;
        }
        return 0;
    }
    // const socket = io('http://54.151.75.108/', { path: '/server'});
    const socket = io('https://apeuro.app/', { path: '/server'})
    socket.on('connect', (data) => {
        window.addEventListener('storage', () => {
            // socket.emit('authentication', localStorage.getItem('name'))
            window.location.reload()
        });
        console.log("connected to socket")
        socket.emit('get_database', teacher.teacher, teacher.period)
    })
    socket.on('all_data', (data) => {
        students = data
        build_page()
    })
    socket.on('update_page', (data) => {
        database_data = data
        var temp = []
        var t = students[0].teacher
        var p = students[0].period

        for (var i in database_data) {
            if (database_data[i]['period'] == p && database_data[i]['teacher'] == t) {
                temp.push(database_data[i])
            }
        }

        if (temp.length !== students.length) {
            document.body.innerHTML = ''
            console.log('new student')
            students = temp.slice()
            students.sort(compare)
            build_page()
        }
        else {
            students = temp.slice()
            students.sort(compare)
            update_page(students)
        }


    })
    document.body.style.background = '#292C2E'

    function update_page(db_data) {
        students = db_data
        var sum = 0
        let temp = students.slice()
        temp.sort(function (a, b) {
            if (a.points > b.points) {
                return -1;
            }
            if (a.points < b.points) {
                return 1;
            }
            return 0;
        }
        )
        for (let i = 0; i < temp.length; i++) {
            sum += temp[i].points
        }
        var average = sum / temp.length
        if (temp.length % 2 == 0) {
            var median = (temp[temp.length / 2].points + temp[temp.length / 2 - 1].points) / 2
        }
        else {
            var median = temp[(temp.length - 1) / 2].points
        }
        average = average.toFixed(2)

        document.getElementsByClassName('statistics')[0].innerHTML =
            'Average: ' + average + '&nbsp;'.repeat(50) + 'High: ' + temp[0].points + "<br />" +
            "Median: " + median + '&nbsp;'.repeat(55) + "Low: " + temp.at(-1).points
        for (let i = 0; i < students.length; i++) {
            document.querySelector("div.leaderboards").getElementsByTagName("div")[i + 2].getElementsByClassName("name")[0].innerHTML = students[i].name
            document.querySelector("div.leaderboards").getElementsByTagName("div")[i + 2].getElementsByClassName("raw_score")[0].innerHTML = students[i].points
            document.querySelector("div.leaderboards").getElementsByTagName("div")[i + 2].getElementsByClassName("actual_score")[0].innerHTML = (students[i].points / average * 100).toFixed(2) + "%"
        }
    }
    function build_page() {
        // document.body.innerHTML += '<div class="leaderboards" style="height: 100vh; background: #292C2E;"></div>'
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
        text_size += 'px'
        students.sort(compare)
        var sum = 0
        for (let i = 0; i < students.length; i++) {
            sum += students[i].points
        }
        var average = sum / students.length
        average = average.toFixed(2)
        document.querySelector('h1').style.fontSize = '1.5rem'
        document.querySelector('h1').style.height = size_unit * 2 + 'px'
        const stats = document.createElement('div')
        stats.style = 'width: 86vw;border-width:1px; border-style: solid; display: flex; justify-content: left; align-items: center; text-align:center'
        stats.style.height = size_unit * 3 + 'px'

        stats.style.position = 'relative'
        stats.style.marginLeft = "7vw"
        stats.style.borderRadius = "5px"
        stats.style.borderColor = '#5f6368'
        stats.style.marginTop = '8vh'
        var statistics = document.createElement('p')
        statistics.className = 'statistics'
        if (students.length % 2 == 0) {

            var median = (students[students.length / 2].points + students[students.length / 2 - 1].points) / 2

        }
        else {
            var median = students[(students.length - 1) / 2].points
        }
        statistics.innerHTML =
            'Average: ' + average + '&nbsp;'.repeat(50) + 'High: ' + students[0].points + "<br />" +
            "Median: " + median + '&nbsp;'.repeat(55) + "Low: " + students.at(-1).points

        console.log(text_size)
        statistics.style.fontSize = size_unit + 'px'
        statistics.style.fontFamily = 'specialhelvetica'
        statistics.style.textAlign = 'center'
        statistics.style.width = '100%'
        statistics.style.height = '70%'
        statistics.style.position = 'absolute'
        statistics.style.color = 'white'
        statistics.style.marginTop = "-0.8%"
        stats.appendChild(statistics)
        document.querySelector('div.leaderboards').appendChild(stats)

        var div = document.createElement('div')
        var name = document.createElement('p')
        var number = document.createElement('p')
        var raw_score = document.createElement('p')
        var actual_score = document.createElement('p')
        div.style = 'width: 86vw; display: flex; justify-content: left; align-items: center;text-align: center'
        div.style.height = size_unit * 1.5 + 'px'
        div.style.position = 'relative'
        div.style.marginTop = "1vh";
        div.style.marginLeft = "7vw"
        // div.style.borderRadius = "5px"
        // div.style.borderColor = '#5f6368'
        console.log(div.style.marginTop)
        name.innerText = "Name";
        name.style.fontSize = text_size
        name.style.fontFamily = 'specialhelvetica'
        name.style.marginLeft = '10vw'
        name.style.position = 'absolute'
        name.className = 'name'

        number.innerText = '#'
        number.style.fontSize = text_size
        number.style.fontFamily = 'specialhelvetica'
        number.style.marginLeft = '1vw'
        number.style.position = 'absolute'
        number.className = 'number'

        raw_score.innerText = "Score";
        raw_score.style.marginLeft = '45vw'
        raw_score.style.position = 'absolute'
        raw_score.style.fontSize = text_size
        raw_score.style.fontFamily = 'specialhelvetica'
        raw_score.className = 'score'

        actual_score.innerText = "Percentage";
        actual_score.style.position = 'absolute'
        actual_score.style.fontSize = text_size
        actual_score.style.fontFamily = 'specialhelvetica'
        actual_score.style.marginLeft = '65vw'
        actual_score.className = 'percent'

        div.style.color = 'white'
        div.appendChild(name)
        div.appendChild(raw_score)
        div.appendChild(actual_score)
        div.appendChild(number)
        document.querySelector('div.leaderboards').appendChild(div)

        let q = {
            // id: 'p[style="font-size: 6vh; font-family: specialhelvetica; margin-left: 10vw; position: absolute;"]',
            name: 'p.name',
            score: 'p.score',
            percentage: 'p.percent'
        }
        for (let i in Object.keys(q)) {
            document.querySelector(q[Object.keys(q)[i]]).addEventListener('click', function () {
                sort = Object.keys(q)[i]

                if (document.querySelector(q[Object.keys(q)[i]]).innerText.includes(' ^')) {
                    document.querySelector(q[Object.keys(q)[i]]).innerText = document.querySelector(q[Object.keys(q)[i]]).innerText.replaceAll(' ^', '')
                    document.querySelector(q[Object.keys(q)[i]]).innerText += ' v'
                }
                else {
                    document.querySelector(q[Object.keys(q)[i]]).innerText = document.querySelector(q[Object.keys(q)[i]]).innerText.replaceAll(' v', '')
                    document.querySelector(q[Object.keys(q)[i]]).innerText += ' ^'
                }
                if (document.querySelector(q[Object.keys(q)[i]]).innerText.includes(' v')) {
                    if (sort == "percentage") {
                        compare = function (a, b) {
                            return ((a['points'] < b['points']) ? -1 : ((a["points"] > b['points']) ? 1 : 0));
                        }
                        students.sort(compare)
                    }
                    if (sort == "score") {
                        compare = function (a, b) {
                            return ((a['points'] < b['points']) ? -1 : ((a["points"] > b['points']) ? 1 : 0));
                        }
                        students.sort(compare)
                    }
                    if (sort == "name") {
                        compare = function (a, b) {
                            return ((a['name'] > b['name']) ? -1 : ((a["name"] < b['name']) ? 1 : 0));
                        }
                        students.sort(compare)
                    }
                }
                if (document.querySelector(q[Object.keys(q)[i]]).innerText.includes(' ^')) {
                    if (sort == "percentage") {
                        compare = function (a, b) {
                            return ((a['points'] > b['points']) ? -1 : ((a["points"] < b['points']) ? 1 : 0));
                        }
                        students.sort(compare)
                    }
                    if (sort == "score") {
                        compare = function (a, b) {
                            return ((a['points'] > b['points']) ? -1 : ((a["points"] < b['points']) ? 1 : 0));
                        }
                        students.sort(compare)
                    }
                    if (sort == "name") {
                        compare = function (a, b) {
                            return ((a['name'] < b['name']) ? -1 : ((a["name"] > b['name']) ? 1 : 0));
                        }
                        students.sort(compare)
                    }
                }
                for (let j in Object.keys(q)) {
                    if (Object.keys(q)[j] != sort) {

                        document.querySelector(q[Object.keys(q)[j]]).innerText = document.querySelector(q[Object.keys(q)[j]]).innerText.replaceAll(' ^', '')
                        document.querySelector(q[Object.keys(q)[j]]).innerText = document.querySelector(q[Object.keys(q)[j]]).innerText.replaceAll(' v', '')
                    }
                }
                update_page(students)
            })
        }

        for (let i = 0; i < students.length; i++) {
            try {
                var div = document.createElement('div')
                var name = document.createElement('p')
                var number = document.createElement('p')
                var raw_score = document.createElement('p')
                var actual_score = document.createElement('p')
                div.style = 'width: 86vw;border-width:0px; border-style: solid; display: flex; align-items: center;text-align: center'
                div.style.height = size_unit * 1.5 + 'px'
                div.style.position = 'relative'
                div.style.marginTop = "1vh";
                div.style.marginLeft = "7vw"
                div.style.borderRadius = "5px"
                div.style.borderColor = '#5f6368'
                div.className = students[i].name
                name.innerText = students[i].name;
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
                raw_score.innerText = students[i].points;
                raw_score.style.marginLeft = '45vw'
                raw_score.style.position = 'absolute'
                raw_score.style.fontSize = text_size
                raw_score.style.fontFamily = 'specialhelvetica'
                raw_score.className = "raw_score"
                actual_score.innerText = (students[i].points / average * 100).toFixed(2) + '%'
                actual_score.style.position = 'absolute'
                actual_score.style.fontSize = text_size
                actual_score.style.fontFamily = 'specialhelvetica'
                actual_score.style.marginLeft = '65vw'
                actual_score.className = "actual_score"

                div.style.color = 'white'
                div.appendChild(name)
                div.appendChild(raw_score)
                div.appendChild(actual_score)
                div.appendChild(number)
                document.querySelector('div.leaderboards').appendChild(div)

            }
            catch {

            }
        }
    }

    return (
        <div >

            {/* <Login style={{ marginLeft: "100px", marginRight: "auto" }}></Login> */}
            <div style={{ position: 'fixed', zIndex: 999, top: "0px" }}>
                <Burger></Burger>
                <h1 style={{ width: "100vw", textAlign: "center", fontSize: "5vh", paddingTop: '2.25vh', marginBottom: 0, fontFamily: 'specialhelvetica', position: "absolute" }}>
                    AP European History
                </h1>
            </div>

            <div className="leaderboards">

            </div>
        </div>
    )
}

export default Leaderboard
