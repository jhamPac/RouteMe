var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function() {
	var app = express();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	require('../app/routes/index.routes.js')(app);
	require('../app/routes/requests.routes.js')(app);

	app.use(express.static('./public'));

	return app;
};
