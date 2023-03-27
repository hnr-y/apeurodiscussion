const express = require('express');
const logger = require('morgan');
const cors = require('cors');
var mysql = require('mysql');
var fs = require("fs")
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
    
});

async function spreadsheetsetup() {
    await client.authorize(function (err, token) {
        if (err) {
            return;
        } else {
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
    let t_auth_dict = { 'hughes123': "hughes", "ceran123": "ceran" }
    let s_auth_dict = {}
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
            // if (err) throw err;
            database_data = eval(JSON.parse(JSON.stringify(result)))

        });
        socket.on('authentication', (data) => {
            if (Object.keys(t_auth_dict).includes(data)) {
                socket.emit('auth', ["teacher", data, t_auth_dict[data]])
            }
            else{
                if (Object.keys(s_auth_dict).includes(data)) {
                    socket.emit('auth', ["student", s_auth_dict[data]])
                }
                else {
                    socket.emit('auth', "incorrect")
                }
            }
            
        })
        socket.on('add_code', (code, t, p) => {
            s_auth_dict[code] = { name: code, teacher: t, period: p }
        })
        socket.on('del_code', (t, p) => {
            let temp = {}
            for (let i = 0; i < Object.keys(s_auth_dict).length; i++) {
                if (s_auth_dict[Object.keys(s_auth_dict)[i]]['teacher'] != t || s_auth_dict[Object.keys(s_auth_dict)[i]]['period'] != p) {
                    if (s_auth_dict[Object.keys(s_auth_dict)[i]]['teacher'] != undefined && s_auth_dict[Object.keys(s_auth_dict)[i]]['period'] != undefined) {
                        temp[s_auth_dict[Object.keys(s_auth_dict)[i]]['name']] = { name: s_auth_dict[Object.keys(s_auth_dict)[i]]['name'], teacher: s_auth_dict[Object.keys(s_auth_dict)[i]]['teacher'], period: s_auth_dict[Object.keys(s_auth_dict)[i]]['period'] }
                    }
                    else {
                        temp[s_auth_dict[Object.keys(s_auth_dict)[i]]['name']] = { name: s_auth_dict[Object.keys(s_auth_dict)[i]]['name'] }
                    }
                }
            }
            io.sockets.emit('d_code', database_data)
            s_auth_dict = temp

        })
        socket.on('get_database', (t, p) => {
            con.query("SELECT * FROM `apeurodiscussion` WHERE teacher = " + JSON.stringify(t) + " AND period = " + p, function (err, result) {
                // if (err) throw err;
                database_data = eval(JSON.parse(JSON.stringify(result)))
                socket.emit('all_data', database_data)
            });
        })
        socket.on('get_full_database', (t, p) => {
            con.query("SELECT * FROM `apeurodiscussion`", function (err, result) {
                // if (err) throw err;
                database_data = eval(JSON.parse(JSON.stringify(result)))
                socket.emit('full_data', database_data)
            });
        })
        socket.on('update_data', (data) => {
            con.query("UPDATE apeurodiscussion SET " + data[1] + " = " + JSON.stringify(data[2]) + " WHERE name = " + JSON.stringify(data[0]), function (err, result) {
                // if (err) throw err;
                // console.log(result)
            });
            con.query("SELECT * FROM apeurodiscussion", function (err, result) {
                // if (err) throw err;
                database_data = eval(JSON.parse(JSON.stringify(result)))
                io.sockets.emit('update_page', database_data)
            });
        })
        socket.on('spreadsheet', (sheet_data, t) => {
            spreadsheetsetup().then(function (sheet_list) {
                var sum = 0
                for (let i = 0; i < sheet_data.length; i++) {
                    sum += sheet_data[i].points
                }
                var average = sum / sheet_data.length
                average = average.toFixed(2)
                var spreadsheetdata = [["Date", "Period", "Average", "Teacher"], [new Date().toLocaleDateString(), sheet_data[0].period, average, sheet_data[0].teacher], ['', '', '', ''], ['', '', '', ''], ["First Name", "Last Name", "Points", "Percentage"]]
                for (let i = 0; i < sheet_data.length; i++) {
                    var firstname = sheet_data[i].name.split(/(\s+)/)[0]
                    var lastname = sheet_data[i].name.split(/(\s+)/)[2]
                    spreadsheetdata.push([firstname, lastname, sheet_data[i].points, (sheet_data[i].points / average * 100).toFixed(2) + '%'])
                }
                var spreadsheettitle = new Date().toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                spreadsheettitle += t
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
        socket.on('transfer', (t, p, table_name) => {

            con.query("SELECT EXISTS( SELECT * FROM information_schema.tables WHERE table_schema = 'apeurodiscussion' AND table_name = '" + table_name + "' )", (err, res) => {
                if (Object.values(eval(JSON.parse(JSON.stringify(res)))[0])[0] == 0) {
                    con.query("CREATE TABLE `" + table_name + "` ( name varchar(255), id int, points int, teacher varchar(255), period int );", (err, res) => {
                        con.query("insert into `" + table_name + "` select * from `apeurodiscussion` where teacher ='" + t + "' and period = " + p + "", (err, res) => {
                            con.query("update apeurodiscussion set points = 0 where teacher = '" + t + "' and period = " + p + "", (err, res) => {
                                con.query("SELECT * FROM apeurodiscussion", function (err, result) {
                                    // if (err) throw err;
                                    database_data = eval(JSON.parse(JSON.stringify(result)))
                                    io.sockets.emit('update_page', database_data)
                                });
                            })
                        })
                    })
                }
                if (Object.values(eval(JSON.parse(JSON.stringify(res)))[0])[0] == 1) {
                    con.query("insert into `" + table_name + "` select * from `apeurodiscussion` where teacher ='" + t + "' and period = " + p + "", (err, res) => {
                        con.query("update apeurodiscussion set points = 0 where teacher = '" + t + "' and period = " + p + "", (err, res) => {
                            con.query("SELECT * FROM apeurodiscussion", function (err, result) {
                                // if (err) throw err;
                                database_data = eval(JSON.parse(JSON.stringify(result)))
                                io.sockets.emit('update_page', database_data)
                            });
                        })
                    })
                }
            })
        })
        socket.on('get_past_dates', () => {
            con.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'apeurodiscussion'", (err, res) => {
                let out = []
                for (let i = 0; i < eval(res).length; i++) {
                    if (eval(res)[i]["TABLE_NAME"] != 'apeurodiscussion') {
                        out.push(eval(res)[i]["TABLE_NAME"])
                    }
                }
                socket.emit('past_dates', JSON.stringify(out))
            })
        })
        socket.on('get_past_data', (t, p, d) => {
            con.query("SELECT * FROM `" + d + "` where teacher='" + t + "' and period=" + p + "", (err, res) => {
                socket.emit('past_data', eval(JSON.parse(JSON.stringify(res))))
            })
        })
        socket.on('get_discussions', () => {
            var discussion_status = JSON.parse(fs.readFileSync("discussions.json"))
            socket.emit('discussions', discussion_status)
        })
        socket.on('set_seating', (data) => {
            var discussion_status = JSON.parse(fs.readFileSync("discussions.json"))
            discussion_status[data[0]]["seating"] = data[1]
            fs.writeFileSync("discussions.json", JSON.stringify(discussion_status));
        })
        socket.on('set_status', (data) => {
            var discussion_status = JSON.parse(fs.readFileSync("discussions.json"))
            discussion_status[data[0]]["status"] = data[1]
            fs.writeFileSync("discussions.json", JSON.stringify(discussion_status));
        })
        socket.on('set_time', (data) => {
            var discussion_status = JSON.parse(fs.readFileSync("discussions.json"))
            discussion_status[data[0]]["start_time"] = data[1]
            fs.writeFileSync("discussions.json", JSON.stringify(discussion_status));
        })
    });
    let hughesP2 = [
        'Cooper Bannon',
        'Rowan Barber',
        'Katie Borders',
        'Cooper Codding',
        'Rose Colgan',
        'Luca Difu',
        'Lisa Draese',
        'Yilin Fang',
        'Kamran Ganjoo',
        'Summer Hashemi',
        'Ryan Idemoto',
        'Aadya Jain',
        'Ryan Jiang',
        'Ronan Kinczel',
        'Kevin LeRoy',
        'Markus McGrath',
        'Julian McMahon',
        'Cameron Nakhjiri',
        'Jiaoyue Pang',
        'Mason Pang',
        'Areeb Rijwane',
        'David Roh',
        'Arryan Shafiei',
        'Monika Snell',
        'Gerald Thomas',
        'Adam Wang',
        'Alison Wen',
        'James Xu',
        'Karissa Yang',
        'Paige Yip',
    ]

    let hughesP4 = [
        'Arav Anand',
        'Lindsey Boyenga',
        'Lilly Campbell',
        'Avelene Celinski',
        'Kyra Cherlopall',
        'Emery Curtis',
        'Hannah Dibowit',
        'Sydney Fried',
        'Kevin Ga',
        'Yalee Gia',
        'Faith Hatch',
        'Ho-Yen Hs',
        'Anne Hs',
        'Finch Johnsto',
        'Addison Lundstrom',
        'Gabriel Martin',
        'Osha Moloney',
        'Brendan Moore',
        'William Morley',
        'Bryce Olson',
        'Lucy Panicacci',
        'Keya Patel',
        'Lucas Quan',
        'Jacob Sherman',
        'Aanya Sing',
        'Erika Snell',
        'Janie Vidovich',
        'David Wan',
        'Jacob Weber',
        'Dana Yong',
    ]

    let hughesP6 = [
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
        'Sarina Swartz',
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

    let ceranP1 = [
        'Akash Gupta-Verma',
        'Alex Yung',
        'Althea Haas',
        'August Sanders',
        'Ava Delaossa',
        'Ava Thompson',
        'Azure Zilka',
        'Bianca Nazarian',
        'Bria Shimada',
        'Brody Horwitz',
        'Brooke Hanson',
        'Claire Mayder',
        'Dat Phan',
        'Eric Wang',
        'Grayson Dyer',
        'Hoa Nguyen',
        'Jovian Hayden',
        'Kaedon Chung',
        'Keira Sullivan',
        'Leo Monteiro',
        'Nisha Jani',
        'Noa Dohler',
        'Paola Gomez-Llagaria',
        'Parker Winokur',
        'Saira Panchal',
        'Sara Niemeyer',
        'Shaurya Banjara',
        'Sky Taylor',
        'Tanav Shankar',
        'Yanis Malhotra',
        'Zac Renfrew',
        'Zach Biller',
    ]

    let ceranP5 = [
        'Aiden Johnston',
        'Aliya Koshalieva',
        'Andrew Phan',
        'Ari Ohriner',
        'Audrey Caukin',
        'Boris Renski',
        'Cadie Ho',
        'Connor Hines',
        'Everett Wang',
        'Evie Havlicek',
        'Ewan Thomas',
        'Gianna Conway',
        'Henry Lee',
        'Isabella Argonza',
        'James Niemeyer',
        'Julia Ernsting',
        'Julia Kennedy',
        'Lauren Wilson',
        'Liza Rozova',
        'Marley Testa',
        'Matthew Ng',
        'Max Markert',
        'Mina Nakamura',
        'Omer Rabin',
        'Rohan Jones',
        'Sasha Handyside',
        'Sneha Eapen',
        'Tre Golino',
        'Vanessa Leathem',
        'Yoav Manor',
        'Yorgo Karamanolis',
    ]
    // for (let i = 0; i < hughesP2.length; i++) {
    //     con.query('INSERT INTO apeurodiscussion (name,id,points,teacher,period) VALUES ('+JSON.stringify(hughesP2[i])+', ' +i +', '+'0' +','+ '"Hughes"'+', '+'2'+')')
    // }
    // for (let i = 0; i < hughesP4.length; i++) {
    //     con.query('INSERT INTO apeurodiscussion (name,id,points,teacher,period) VALUES ('+JSON.stringify(hughesP4[i])+', ' +i +', '+'0' +','+ '"Hughes"'+', '+'4'+')')
    // }
    // for (let i = 0; i < hughesP6.length; i++) {
    //     con.query('INSERT INTO apeurodiscussion (name,id,points,teacher,period) VALUES ('+JSON.stringify(hughesP6[i])+', ' +i +', '+'0' +','+ '"Hughes"'+', '+'6'+')')
    // }
    // for (let i = 0; i < ceranP1.length; i++) {
    //     con.query('INSERT INTO apeurodiscussion (name,id,points,teacher,period) VALUES ('+JSON.stringify(ceranP1[i])+', ' +i +', '+'0' +','+ '"Ceran"'+', '+'1'+')')
    // }
    // for (let i = 0; i < ceranP5.length; i++) {
    //     con.query('INSERT INTO apeurodiscussion (name,id,points,teacher,period) VALUES ('+JSON.stringify(ceranP5[i])+', ' +i +', '+'0' +','+ '"Ceran"'+', '+'5'+')')
    // }


});
