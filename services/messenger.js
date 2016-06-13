var ent  = require('ent');
var _ =  require('underscore');
module.exports = function(app){
	return{
		draw_line : function(msg){
			//if(this.id === app.room.props.drawer) app.socket.io.emit('draw_line',msg);
			app.socket.io.emit('draw_line',msg);
		},
		leave : function(point){
			app.socket.io.emit('leave',point);
		},
		answer : function(response){
			var id = this.id;

			_.find(app.room.props.attendees, function(item) {
				console.log(item.id === id,id,item.id);
			    return item.id == id; 
			});
			app.socket.io.emit('answered',ent.encode(response));
		}

	}
}