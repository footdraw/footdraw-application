
	var config  = require('config');
	var app = {
		root : __dirname,
		config : config
	};
	app.server = require('./drivers/server')(app);
	app.routes = require('./drivers/routes.js')(app);
	app.socket = require('./drivers/socket.js')(app);
	app.messenger = require('./services/messenger.js')(app);
	app.randomize = require('./services/randomize.js')(app);
	app.room = require('./services/room.js')(app);
	app.server.create();