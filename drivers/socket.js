var socketio = require('socket.io');

module.exports = function(app){
	return {
		io : null,
		init : function(){
			this.io = socketio(app.server.instance);
		    this.listen();
		},
		listen : function(){
			this.io.on('connection' ,function(socket){
		    console.log('A user connected');
            app.room.init();

            for (var i = app.config.events.length - 1; i >= 0; i--) {
                var _ev         = app.config.events[i];
                var _service    = _ev.method.split('::')[0],
                        _method = _ev.method.split('::')[1];
                socket.on(_ev.listener,app[_service][_method]);
            };

            socket.on('disconnect',function(){
              console.log('A user is disconnected');
            });
			});
		}
	};
}
