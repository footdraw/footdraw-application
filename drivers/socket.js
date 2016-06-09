var socketio = require('socket.io');

module.exports = function(app) {
  return {
    io : null,

    init : function() {
        this.io = socketio(app.server.instance);
        this.listen();
    },

    listen : function() {
      this.io.on('connection', function(socket) {
        console.log('user connected');

        for (var i=0; i<app.config.events.length; i++) {
          var _ev = app.config.events[i]
          _service = _ev.method.split('::')[0],
          _method = _ev.method.split('::')[1];

          socket.on(_ev.listener, app[_service][_method]);
        }

        socket.on('send', function(msg) {
          app.socket.io.emit('reveive', msg);
        })
      });
    }
  }
}
