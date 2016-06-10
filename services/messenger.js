var ent  = require('ent');
module.exports = function(app){
	return{
		draw_line : function(msg){
			if(this.id === app.room.props.drawer) app.socket.io.emit('draw_line',msg);
		},
		leave : function(point){
			app.socket.io.emit('leave',point);
		},
		answer : function(response){
			app.socket.io.emit('answered',ent.encode(response));
		}

	}
}