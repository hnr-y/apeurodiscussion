var express = require('express')
var bodyParser = require('body-parser')
var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post("/", function(req, res, next) {
    res.send("API is working properly");
    console.log(res.body)
    console.log(req.body)
    console.log(next.body)
    
    // res.send("a")
});

module.exports = app;
