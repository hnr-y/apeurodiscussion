const express = require('express')

const app = express()

app.get('/api', (req, res)=>{
    res.json({"user": ["a", 'b', 'c']})
})

app.listen(5000, ()=>{console.log("server started lol")})