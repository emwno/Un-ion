var express = require('express');
var bodyParser = require('body-parser');
var Backendless = require('backendless');

var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var gameRouter = require('./routes/game');

var app = express();

// Setup Backendless
const APP_ID = '3C12364D-8C22-6E45-FFB7-08B271E5A300';
const API_KEY = 'DEF1CFCE-2AE2-7E3D-FF3C-9A77DB377000';
Backendless.initApp(APP_ID, API_KEY);

// Setup access control
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

// Setup body parser
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

// Setup routes
homeRouter(app);
loginRouter(app);
gameRouter(app);

// Setup listener
const port = 5000;
const herokuPort = process.env.port;
app.listen(port, () => `Server running on port ${port}`);
app.listen(herokuPort, () => `Server running on port ${herokuPort}`);
