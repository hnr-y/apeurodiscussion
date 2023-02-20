const express = require('express');
const logger = require('morgan');
const cors = require('cors');
var mysql = require('mysql');
const { google } = require("googleapis");
const keys = require('./credentials.json')
const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"]

)
var gsapi

http = require('http')
socketIO = require('socket.io')

var con = mysql.createConnection({
    host: "apeurotesting.cgogk6qktlax.us-west-1.rds.amazonaws.com",
    user: "admin",
    database: "apeurodiscussion",
    password: "edwinscockishard",
    port: 3306,
});

async function spreadsheetsetup() {
    await client.authorize(function (err, token) {
        if (err) {
            console.log(err)
            return;
        } else {
            // console.log('spreadsheet connected')

        }
    })
    gsapi = google.sheets({ version: "v4", auth: client })
    const result = (await gsapi.spreadsheets.get({
        spreadsheetId: "1G7UXpGoB2aIe-chtI8h-vu97Pww1ST_hesnLx-rP2CU"
    })).data.sheets.map((sheet) => {
        return sheet.properties.title
    })

    return result
}
async function update_sheets(r, v) {
    var options = {
        spreadsheetId: '1G7UXpGoB2aIe-chtI8h-vu97Pww1ST_hesnLx-rP2CU',
        range: r,
        valueInputOption: "USER_ENTERED",

        resource: { values: v },

    }

    // var data = await gsapi.spreadsheets.values.get(opt)
    // console.log(data.data.values)
    // let res = await gsapi.spreadsheets.values.update(updateOptions)
    await gsapi.spreadsheets.values.update(options)
}
async function create_new_sheets(t) {
    var options = {
        spreadsheetId: "1G7UXpGoB2aIe-chtI8h-vu97Pww1ST_hesnLx-rP2CU",
        resource: {
            requests: [{
                addSheet: {
                    properties: {
                        title: t

                    }
                }
            }]
        }
    }
    await gsapi.spreadsheets.batchUpdate(options)

}
// function compare(a, b) {
//     if (a.points > b.points) {
//         return -1;
//     }
//     if (a.points < b.points) {
//         return 1;
//     }
//     return 0;

// }

const app = express();
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
        path: '/server',

        'transports': ['websocket', 'polling'],
        cors: {
            origin: "*", //your own :port or a "*" for all origins
        }
    });


    io.on('connection', function (socket) {
        con.query("SELECT * FROM apeurodiscussion", function (err, result) {
            if (err) throw err;
            database_data = eval(JSON.parse(JSON.stringify(result)))

        });
        socket.on('authentication', (data) => {

            if (['Edwin Hou'].includes(data)) {

                socket.emit('auth', 'correct')
            }
            else {
                socket.emit('auth', "incorrect")
            }
        })
        socket.on('get_database', () => {
            con.query("SELECT * FROM apeurodiscussion", function (err, result) {
                if (err) throw err;
                database_data = eval(JSON.parse(JSON.stringify(result)))
                socket.emit('all_data', database_data)
            });
        })
        socket.on('update_data', (data) => {
            // console.log(data)

            con.query("UPDATE apeurodiscussion SET " + data[1] + " = " + JSON.stringify(data[2]) + " WHERE Id = " + data[0], function (err, result) {
                if (err) throw err;
                // console.log(result)
            });
            con.query("SELECT * FROM apeurodiscussion", function (err, result) {
                if (err) throw err;
                database_data = eval(JSON.parse(JSON.stringify(result)))
                io.sockets.emit('update_page', database_data)
            });
        })
        socket.on('spreadsheet', () => {
            spreadsheetsetup().then(function (sheet_list) {
                var sum = 0
                for (let i = 0; i < database_data.length; i++) {
                    sum += database_data[i].points
                }
                var average = sum / database_data.length
                average = average.toFixed(2)
                var spreadsheetdata = [["Date", "Period", "Average", "Teacher"], [new Date().toLocaleDateString(), database_data[0].period, average, database_data[0].teacher], ['', '', '', ''], ['', '', '', ''], ["First Name", "Last Name", "Points", "Percentage"]]
                for (let i = 0; i < database_data.length; i++) {
                    var firstname = database_data[i].name.split(/(\s+)/)[0]
                    var lastname = database_data[i].name.split(/(\s+)/)[2]
                    spreadsheetdata.push([firstname, lastname, database_data[i].points, (database_data[i].points / average * 100).toFixed(2) + '%'])
                }


                var spreadsheettitle = new Date().toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                // console.log(sheet_list)
                if (!sheet_list.includes(spreadsheettitle)) {
                    create_new_sheets(spreadsheettitle).then(() => {
                        update_sheets(spreadsheettitle + "!A1", spreadsheetdata)
                    }
                    )
                } else {
                    update_sheets(spreadsheettitle + "!A1", spreadsheetdata)
                }


            })

        })

    });
    let a = [
        'Emerson Adams',
        'Anvita Anand',
        'Kayden Bakhtiari',
        'Dena Bernstein',
        'Brianne Blum',
        'Michael Chekler',
        'Olivia Dang',
        'Katherine Darbinyan',
        'Bonnie Davis',
        'Naveen Ettema',
        'Dee Goldberg',
        'Edwin Hou',
        'Margaret Kennedy',
        'Neil Khandelwal',
        'Benjamin Klarich',
        'Lochlan Kominar',
        'Murdoch McNelly',
        'Grant Murphy',
        'Annika Norquist',
        'Ella Noy',
        'Lliam Pitt',
        'Aleksandra Rombakh',
        'Sarina Salzer-Swartz',
        'Leon Sarashki',
        'Rushil Sharma',
        'Carrick Stevens',
        'Anna Suvorova',
        'David Thorsteinsson',
        'Ihsan Unal',
        'Andrew Ventocilla',
        'Hannah Wells',
        'Andrew Zheng',
        'Zoey Zhu',
    ]
    // for (let i = 0; i < a.length; i++) {
    //     con.query('INSERT INTO apeurodiscussion (name,id,points,teacher,period) VALUES ('+JSON.stringify(a[i])+', ' +i +', '+'0' +','+ '"Hughes"'+', '+'6'+')')
    // }

});
