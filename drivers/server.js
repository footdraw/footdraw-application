var express = require('express')(),
	http = require('http');

module.exports = function(app){
	return {
		instance : null,
		create : function(){
			this.instance = http.Server(express);
			app.routes.create(express);
			if(app.config.socket) app.socket.init();
			this.listen();
		},
		listen : function(){
			this.instance.listen(3000,function(){
				console.log('Server Listening on *: 3000');
			});
		}
	};
}