const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

//use cors to allow cross origin resource sharing
app.use(
    cors()
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/create', function (req, res) {
    const data = JSON.parse(JSON.stringify(req.body))

    
    console.log(data);
});


app.listen(5000, () => {
    console.log('Server Listening on port 5000');
});
