import { Link } from "react-router-dom";
import io from 'socket.io-client';
import './App.css'



const Leaderboard = () => {
    let students = []
    var database_data
    function compare(a, b) {
        if (a.points > b.points) {
            return -1;
        }
        if (a.points < b.points) {
            return 1;
        }
        return 0;

    }
    const socket = io('https://APEURODISCUSSIONLEADERBOARD.edwinhou.repl.co');
    socket.on('connect', (data) => {

        console.log("connected to socket")
        socket.emit('get_database')


    })
    socket.on('all_data', (data) => {
        students = data
        build_page()
    })
    socket.on('update_page', (data) => {
        database_data = data
        database_data.sort(compare)
        students.sort(compare)
        if (database_data.length !== students.length) {
            document.body.innerHTML = ''
            console.log('new student')
            students = database_data
            build_page()
        }
        else {
            students = database_data
            var sum = 0
            for (let i = 0; i < students.length; i++) {
                sum += students[i].points
            }
            var average = sum / students.length
            if (students.length % 2 == 0) {

                var median = (students[students.length / 2].points + students[students.length / 2 - 1].points) / 2
    
            }
            else {
                var median = students[(students.length - 1) / 2].points
            }
            average = average.toFixed(2)
            document.getElementsByClassName('statistics')[0].innerHTML = "Statistics for: " + students[0].teacher + " period " + students[0].period + "<br />" +
                'Average: ' + average + '&nbsp;'.repeat(50) + 'High: ' + students[0].points + "<br />" +
                "Median: " + median + '&nbsp;'.repeat(55) + "Low: " + students.at(-1).points
            for (let i = 0; i < students.length; i++) {
                document.querySelector("div.leaderboard").getElementsByTagName("div")[i + 2].getElementsByClassName("name")[0].innerHTML = students[i].name
                document.querySelector("div.leaderboard").getElementsByTagName("div")[i + 2].getElementsByClassName("raw_score")[0].innerHTML = students[i].points
                document.querySelector("div.leaderboard").getElementsByTagName("div")[i + 2].getElementsByClassName("actual_score")[0].innerHTML = (students[i].points / average * 100).toFixed(2) + "%"
            }
        }


    })
    document.body.style.background = '#292C2E'


    function build_page() {

        students.sort(compare)
        var sum = 0
        for (let i = 0; i < students.length; i++) {
            sum += students[i].points
        }
        var average = sum / students.length
        average = average.toFixed(2)
        const stats = document.createElement('div')
        stats.style = 'width: 86vw; height:' + '18vh;border-width:1px; border-style: solid; display: flex; justify-content: left; align-items: center; text-align:center'
        stats.style.position = 'absolute'
        stats.style.marginLeft = "8vw"
        stats.style.borderRadius = "5px"
        stats.style.borderColor = '#5f6368'
        stats.style.marginTop = '5vh'
        var statistics = document.createElement('p')
        statistics.className = 'statistics'
        if (students.length % 2 == 0) {

            var median = (students[students.length / 2].points + students[students.length / 2 - 1].points) / 2

        }
        else {
            var median = students[(students.length - 1) / 2].points
        }
        statistics.innerHTML = "Statistics for: " + students[0].teacher + " period " + students[0].period + "<br />" +
            'Average: ' + average + '&nbsp;'.repeat(50) + 'High: ' + students[0].points + "<br />" +
            "Median: " + median + '&nbsp;'.repeat(55) + "Low: " + students.at(-1).points

        statistics.style.fontSize = "5vh"
        statistics.style.fontFamily = 'specialhelvetica'
        statistics.style.textAlign = 'center'
        statistics.style.width = '100%'
        statistics.style.height = '100%'
        statistics.style.position = 'absolute'
        statistics.style.color = 'white'
        stats.appendChild(statistics)
        document.querySelector('div.leaderboard').appendChild(stats)

        var div = document.createElement('div')
        var name = document.createElement('p')
        var number = document.createElement('p')
        var raw_score = document.createElement('p')
        var actual_score = document.createElement('p')
        div.style = 'width: 85vw; height:' + '6vh; display: flex; justify-content: left; align-items: center;text-align: center'

        div.style.position = 'absolute'
        div.style.marginTop = 25 + "vh";
        div.style.marginLeft = "8vw"
        // div.style.borderRadius = "5px"
        // div.style.borderColor = '#5f6368'

        name.innerText = "Name:";
        name.style.fontSize = "6vh"
        name.style.fontFamily = 'specialhelvetica'
        name.style.marginLeft = '10vw'
        name.style.position = 'absolute'
        number.innerText = '#'
        number.style.fontSize = "6vh"
        number.style.fontFamily = 'specialhelvetica'
        number.style.marginLeft = '1vw'
        number.style.position = 'absolute'

        raw_score.innerText = "Score:";
        raw_score.style.marginLeft = '50vw'
        raw_score.style.position = 'absolute'
        raw_score.style.fontSize = "6vh"
        raw_score.style.fontFamily = 'specialhelvetica'
        actual_score.innerText = "Percentage:";
        actual_score.style.position = 'absolute'
        actual_score.style.fontSize = "6vh"
        actual_score.style.fontFamily = 'specialhelvetica'
        actual_score.style.marginLeft = '70vw'
        div.style.color = 'white'
        div.appendChild(name)
        div.appendChild(raw_score)
        div.appendChild(actual_score)
        div.appendChild(number)
        document.querySelector('div.leaderboard').appendChild(div)

        for (let i = 0; i < students.length; i++) {
            try {
                var div = document.createElement('div')
                var name = document.createElement('p')
                var number = document.createElement('p')
                var raw_score = document.createElement('p')
                var actual_score = document.createElement('p')
                div.style = 'width: 86vw; height:' + '6vh;border-width:1px; border-style: solid; display: flex; align-items: center;text-align: center'
                div.style.position = 'absolute'
                div.style.marginTop = 7 * (i + 1) + 25 + "vh";
                div.style.marginLeft = "8vw"
                div.style.borderRadius = "5px"
                div.style.borderColor = '#5f6368'
                div.className = students[i].name
                name.innerText = students[i].name;
                name.style.fontSize = "6vh"
                name.style.fontFamily = 'specialhelvetica'
                name.style.marginLeft = '10vw'
                name.style.position = 'absolute'
                name.className = "name"
                number.innerText = i + 1;
                number.style.fontSize = "6vh"
                number.style.fontFamily = 'specialhelvetica'
                number.style.marginLeft = '1vw'
                number.style.position = 'absolute'
                raw_score.innerText = students[i].points;
                raw_score.style.marginLeft = '50vw'
                raw_score.style.position = 'absolute'
                raw_score.style.fontSize = "6vh"
                raw_score.style.fontFamily = 'specialhelvetica'
                raw_score.className = "raw_score"
                actual_score.innerText = (students[i].points / average * 100).toFixed(2) + '%'
                actual_score.style.position = 'absolute'
                actual_score.style.fontSize = "6vh"
                actual_score.style.fontFamily = 'specialhelvetica'
                actual_score.style.marginLeft = '70vw'
                actual_score.className = "actual_score"

                div.style.color = 'white'
                div.appendChild(name)
                div.appendChild(raw_score)
                div.appendChild(actual_score)
                div.appendChild(number)
                document.querySelector('div.leaderboard').appendChild(div)

            }
            catch {

            }
        }
    }

    return (
        <div style={{ marginTop: 0 }}>
            {/* <Link style={{ marginLeft: 100 }} to="/">home</Link>
            <Link style={{ marginLeft: 100 }} to="/recorder">recorder</Link>
            <Link style={{ marginLeft: 100 }} to="/leaderboard">leaderboard</Link> */}
            <h1 style={{ textAlign: "center", fontSize: "8vh", marginTop: 0, marginBottom: 0, fontFamily: 'specialhelvetica' }}>
                AP European <span style={{ color: "white" }}>History</span>
            </h1>
            <div className="leaderboard" style={{ minHeight: "100vh", background: "#292C2E" }}>
            </div>
        </div>
    )
}

export default Leaderboard