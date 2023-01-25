const express = require('express');
const logger = require('morgan');
const cors = require('cors');
var mysql = require('mysql');
http = require('http')
socketIO = require('socket.io')

var con = mysql.createConnection({
    host: "apeurotesting.cgogk6qktlax.us-west-1.rds.amazonaws.com",
    user: "admin",
    database: "apeurodiscussion",
    password: "edwinscockishard",
    port: 3306,
});


function compare(a, b) {
    if (a.points > b.points) {
        return -1;
    }
    if (a.points < b.points) {
        return 1;
    }
    return 0;

}

const app = express();

//use cors to allow cross origin resource sharing
app.use(
    cors()
);
app.use(express.text())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var database_data = []
con.connect(function (err) {
    // if (err) throw err;
    console.log("Connected!");
    server = http.Server(app);
    server.listen(5000);

    const io = socketIO(server, {
        cors: {
            origin: "*", //your own :port or a "*" for all origins
        }
    });


    io.on('connection', function (socket) {
        socket.on('get_database', () => {
            con.query("SELECT * FROM apeurodiscussion", function (err, result) {
                if (err) throw err;
                database_data = eval(JSON.parse(JSON.stringify(result)))
                socket.emit('all_data', database_data)
            });
        })
        socket.on('update_data', (data) => {
            console.log(data)

            con.query("UPDATE apeurodiscussion SET " + data[1] + " = " + JSON.stringify(data[2]) + " WHERE Id = " + data[0], function (err, result) {
                if (err) throw err;
                console.log(result)
            });
            con.query("SELECT * FROM apeurodiscussion", function (err, result) {
                if (err) throw err;
                database_data = eval(JSON.parse(JSON.stringify(result)))
                io.sockets.emit('update_page', database_data)
            });
        })

    });
    let a = [
        "Akash	Gupta-Verma",
        "Alex	Yung",
        "Althea	Haas",
        "August	Sanders",
        "Ava	Delaossa",
        "Ava	Thompson",
        "Azure	Zilka",
        "Bianca	Nazarian",
        "Bria	Shimada",
        "Brody	Horwitz",
        "Brooke	Hanson",
        "Claire	Mayder",
        "Dat	Phan",
        "Eric	Wang",
        "Grayson	Dyer",
        "Hoa	Nguyen",
        "Jovian	Hayden",
        "Kaedon	Chung",
        "Keira	Sullivan",
        "Leo	Monteiro Villela",
        "Nisha	Jani",
        "Noa	Dohler Guilera",
        "Paola	Gomez-Llagaria",
        "Parker	Winokur",
        "Saira	Panchal",
        "Sara	Niemeyer",
        "Shaurya	Banjara",
        "Sky	Taylor",
        "Tanav	Shankar",
        "Yanis	Malhotra",
        "Zac	Renfrew",
        "Zach	Biller",
    ]
    // for (let i = 0; i < a.length; i++) {
    //     con.query('INSERT INTO apeurodiscussion (name,id,points,teacher,period) VALUES ('+JSON.stringify(a[i])+', ' +i +', '+'0' +','+ '"Hughes"'+', '+'6'+')')
    // }

});
