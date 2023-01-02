
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { onSnapshot, updateDoc, getFirestore, doc, getDoc, getDocs, collection, addDoc, query, where } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { Link } from "react-router-dom";
const Leaderboard = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyBvU2vc8XXwmCM2cYzMy-U34-dbmKRcuDI",
        authDomain: "apeurodiscussion-1efe3.firebaseapp.com",
        projectId: "apeurodiscussion-1efe3",
        storageBucket: "apeurodiscussion-1efe3.appspot.com",
        messagingSenderId: "581164709735",
        appId: "1:581164709735:web:ccd584fe0151904f6de1c2",
        measurementId: "G-76GNKYHHVE"
    };

    initializeApp(firebaseConfig)

    const db = getFirestore()
    const colRef = collection(db, 'Students')


    function compare(a, b) {
        if (a.points > b.points) {
            return -1;
        }
        if (a.points < b.points) {
            return 1;
        }
        return 0;
    }
    document.body.style.background = "#242526"

    let students = []
    document.body.innerHTML = ''
    getDocs(colRef).then((snapshot) => {
        students = []
        snapshot.docs.forEach((doc) => {
            students.push(doc.data())
        })
        // console.log(students.length)
    }).then(() => {

        students.sort(compare)
        var sum = 0
        for (let i = 0; i < students.length; i++) {
            sum += students[i].points
        }
        var average = sum / students.length
        average = average.toFixed(2)
        const div = document.createElement('div')
        var name = document.createElement('p')
        var raw_score = document.createElement('p')
        var actual_score = document.createElement('p')
        var average_score = document.createElement('p')
        div.style = 'background-color:white;width: 98%; height:' + window.outerHeight * 0.08 + 'px;border-width:5px; border-style: solid; display: flex; justify-content: left; align-items: center;text-align: center'
        div.style.position = 'absolute'
        div.style.marginTop = window.outerHeight * 0.01 + "px";
        div.style.marginLeft = "0.5%"
        div.style.borderRadius = "20px"
        name.innerText = "Name:";
        name.style.fontSize = window.outerHeight * 0.08 * 0.25 + 'px'
        name.style.fontFamily = 'Karla'
        name.style.marginLeft = '1%'
        name.style.position = 'absolute'
        raw_score.innerText = "Score:";
        raw_score.style.marginLeft = '50%'
        raw_score.style.position = 'absolute'
        raw_score.style.fontSize = window.outerHeight * 0.08 * 0.25 + 'px'
        raw_score.style.fontFamily = 'Karla'
        actual_score.innerText = "Percentage:";
        actual_score.style.position = 'absolute'
        actual_score.style.fontSize = window.outerHeight * 0.08 * 0.25 + 'px'
        actual_score.style.fontFamily = 'Karla'
        actual_score.style.marginLeft = '80%'
        average_score.innerText = "Average Score: " + average;
        average_score.style.marginLeft = '20%'
        average_score.style.position = 'absolute'
        average_score.style.fontSize = window.outerHeight * 0.08 * 0.25 + 'px'
        average_score.style.fontFamily = 'Karla'
        average_score.className = 'average_score'
        div.style.background = '#6c6f72'
        div.appendChild(name)
        div.append(average_score)
        div.appendChild(raw_score)
        div.appendChild(actual_score)
        document.body.appendChild(div)

        for (let i = 0; i < students.length; i++) {
            try {
                const div = document.createElement('div')
                var name = document.createElement('p')
                var raw_score = document.createElement('p')
                var actual_score = document.createElement('p')
                div.style = 'background-color:white;width: 98%; height:' + window.outerHeight * 0.08 + 'px;border-width:5px; border-style: solid; display: flex; justify-content: left; align-items: center;text-align: center'
                div.style.position = 'absolute'
                div.style.marginTop = window.outerHeight * 0.08 * (i + 1) + (i + 1) * 20 + window.outerHeight * 0.01 + "px";
                div.style.marginLeft = "0.5%"
                div.style.borderRadius = "20px"
                div.className = students[i].name
                name.innerText = students[i].name;
                name.style.fontSize = window.outerHeight * 0.08 * 0.25 + 'px'
                name.style.fontFamily = 'Karla'
                name.style.marginLeft = '1%'
                name.style.position = 'absolute'
                name.className = "name"
                raw_score.innerText = students[i].points;
                raw_score.style.marginLeft = '50%'
                raw_score.style.position = 'absolute'
                raw_score.style.fontSize = window.outerHeight * 0.08 * 0.25 + 'px'
                raw_score.style.fontFamily = 'Karla'
                raw_score.className = "raw_score"
                actual_score.innerText = (students[i].points / average * 100).toFixed(2) + '%'
                actual_score.style.position = 'absolute'
                actual_score.style.fontSize = window.outerHeight * 0.08 * 0.25 + 'px'
                actual_score.style.fontFamily = 'Karla'
                actual_score.style.marginLeft = '80%'
                actual_score.className = "actual_score"
                div.style.background = '#6c6f72'

                div.appendChild(name)
                div.appendChild(raw_score)
                div.appendChild(actual_score)
                document.body.appendChild(div)

            }
            catch {

            }
        }
        onSnapshot(colRef, (snapshot) => {
            students = []
            snapshot.docs.forEach((doc) => {
                students.push(doc.data())
            })
            students.sort(compare)
            var sum = 0
            for (let i = 0; i < students.length; i++) {
                sum += students[i].points
            }
            var average = sum / students.length
            average = average.toFixed(2)
            for (let i = 1; i < students.length + 1; i++) {
                document.getElementsByClassName('average_score')[0].innerHTML = 'Average Score: ' + average
                document.getElementsByTagName("div")[i].getElementsByClassName("name")[0].innerHTML = students[i - 1].name
                document.getElementsByTagName("div")[i].getElementsByClassName("raw_score")[0].innerHTML = students[i - 1].points
                document.getElementsByTagName("div")[i].getElementsByClassName("actual_score")[0].innerHTML = (students[i - 1].points / average * 100).toFixed(2) + "%"

            }
        })

    })
    return (
        <div>
            <Link style={{ marginLeft: 100 }} to="/">home</Link>
            <Link style={{ marginLeft: 100 }} to="/recorder">recorder</Link>
            <Link style={{ marginLeft: 100 }} to="/leaderboard">leaderboard</Link>
        </div>
    )
}

export default Leaderboard