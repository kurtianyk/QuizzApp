const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require('./models/db.js');

const test = require('./routes/tests.js');
const result = require('./routes/results.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile('index.html', {root: __dirname});
});
app.get('/test', test.getTest);
app.post('/add', result.addResult);

let port = 8080;

let server = app.listen(port, function(req,res){
	console.log("Catch the action at http://localhost:"+port);
});
