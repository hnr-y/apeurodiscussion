import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { onSnapshot, updateDoc, getFirestore, doc, getDoc, getDocs, collection, addDoc, query, where } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { Link } from "react-router-dom";

const Recorder = () => {
    
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

    // async function get_query_data(q) {
    //     let output
    //     const data = query(colRef, where(...q))
    //     getDocs(data).then((snapshot) => {
    //         // console.log(snapshot.docs)
    //         snapshot.docs.forEach((doc) => {
    //             output = doc.data()
    //         })
    //     }).then(()=>{
    //         console.log(output)
    //         return output
    //     })
    //     // console.log(output)

    // }
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
    function update_document(q, key, value) {
        const data = query(colRef, where(...q))
        getDocs(data).then((snapshot) => {
            // console.log(q)

            snapshot.docs.forEach((doc) => {


                updateDoc(doc.ref, {
                    [key]: value
                })
            })
            // return output
        })
    }
    function add_entry(entry) {
        addDoc(colRef, entry)
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

    let size
    let students = []
    document.body.style.background = "#242526"
    getDocs(colRef).then((snapshot) => {
        students = []
        snapshot.docs.forEach((doc) => {
            students.push(doc.data())
        })
        // console.log(students.length)
        students.sort(compare)
    }).then(() => {

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
                    // console.log(i,j)
                    box.style = 'width:' + size + 'px;height:' + size + 'px;border:1px solid #000;position:absolute; margin-top:' + ((j * (size * 6 / 5)) + (window.innerHeight - rows * (size * 6 / 5)) / 2) + 'px;margin-left:' + (i * (size * 6 / 5) + (window.innerWidth - column * (size * 6 / 5)) / 2) + 'px;display: flex; justify-content: center; align-items: center;text-align: center'
                    box.style.borderRadius = '20px';
                    box.style.backgroundColor = '#6c6f72'

                    subtract.style = "width:" + parseInt(box.style.width) / 2 + 'px;height:' + parseInt(box.style.height) / 8 + 'px; background-color:red;margin-top:' + parseInt(box.style.height) * 5 / 8 + 'px;position:absolute;z-index:999'
                    subtract.className = students[count].name + "sub"
                    // absent.style = "width:" + parseInt(box.style.width) / 8 + 'px;height:' + parseInt(box.style.height) / 8 + 'px; background-color:blue;margin-top:' + parseInt(box.style.height) * 5 / 8 + 'px;position:absolute;z-index:999'
                    // absent.innerHTML = 'X'
                    // absent.style.marginLeft = -parseInt(box.style.width) / 2 - parseInt(box.style.width) / 4 + 'px'
                    // absent.className = students[count].name + "absent"
                    // absent.style.fontSize = parseInt(box.style.width) * 0.1 + 'px'
                    // absent.style.marginLeft = '10px'
                    box.className = students[count].name
                    name.innerHTML = box.className
                    name.style.fontFamily = "Karla"
                    name.style.fontSize = size * 0.12 + 'px'
                    score.innerHTML = 'Score: ' + students[count].points
                    score.style.position = 'absolute'
                    score.style.marginTop = '-50%'
                    score.className = students[count].name + "score"
                    box.onselectstart = function () { return false }
                    box.appendChild(name)
                    box.appendChild(subtract)
                    box.appendChild(score)
                    // box.appendChild(absent)
                    document.body.appendChild(box)
                    count += 1
                }
                catch {

                }
            }
        }

        for (let i = 0; i < count; i++) {
            // console.log(students[i].entry.name)
            document.getElementsByClassName(students[i].name)[0].addEventListener('click', function (event) {
                // console.log(students[i].name, i)

                update_document(['name', '==', students[i].name], "points", students[i].points + 1)
                // students[i].points += 1

                document.getElementsByClassName(students[i].name)[0].style.backgroundColor = 'green'
                setTimeout(function () {
                    document.getElementsByClassName(students[i].name)[0].style.backgroundColor = "#6c6f72";  // Change the color back to the original
                }, 300);

            })
            document.getElementsByClassName(students[i].name + 'sub')[0].addEventListener('click', function (event) {

                event.stopPropagation()
                update_document(['name', '==', students[i].name], "points", students[i].points - 1)
                // students[i].points -= 1

                document.getElementsByClassName(students[i].name)[0].style.backgroundColor = 'red'
                setTimeout(function () {
                    document.getElementsByClassName(students[i].name)[0].style.backgroundColor = "#6c6f72";  // Change the color back to the original
                }, 300);

            })
            // document.getElementsByClassName(students[i].name + 'absent')[0].addEventListener('click', function (event) {
            //     event.stopPropagation()
            //     update_document(['name', '==', students[i].name], "absent", true)
            // })
        }
    })

    onSnapshot(colRef, (snapshot) => {
        students = []
        snapshot.docs.forEach((doc) => {
            students.push(doc.data())
        })
        students.sort(compare)
        for (let i = 0; i < students.length; i++) {
            if (students[i].absent == true) {
                const overlay = document.createElement('div')
                const absent_name = document.createElement('div')
                overlay.style = "width:" + parseInt(document.getElementsByClassName(students[i].name)[0].style.width) + 'px;height:' + parseInt(document.getElementsByClassName(students[i].name)[0].style.height) + 'px; background-color:red;margin-top:' + 'px;position:absolute;z-index:999; '
                overlay.style.borderRadius = '20px';
                absent_name.innerHTML = students[i].name
                document.getElementsByClassName(students[i].name)[0].appendChild(overlay)
                overlay.appendChild(absent_name)
                console.log(students[i].absent)
            }
            // console.log(students[i].absent)

            document.getElementsByClassName(students[i].name)[0].getElementsByClassName(students[i].name + 'score')[0].innerHTML = "score: " + students[i].points
            // console.log(document.getElementsByClassName(students[i].name)[0].getElementsByClassName(students[i].name+'score')[0].innerHTML)
        }
    })
    return (
        <div>
            <Link style={{ marginLeft: 100 }} to="/">home</Link>
            <Link style={{ marginLeft: 100 }} to="/recorder">recorder</Link>
            <Link style={{ marginLeft: 100 }} to="/leaderboard">leaderboard</Link>
        </div>
    )

}

export default Recorder