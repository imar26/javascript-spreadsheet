var express = require('express');
var path = require('path');
var app = express();

var PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(PORT);
console.log('Javascript spreadsheet application running on: ' + PORT);