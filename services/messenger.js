var ent  = require('ent');
var _ =  require('underscore');
module.exports = function(app){
	return{
		draw_line : function(msg){
			if(this.id === app.room.props.drawer) app.socket.io.emit('draw_line',msg);
		},
		leave : function(point){
			app.socket.io.emit('leave',point);
		},
		answer : function(response){
			var id = this.id;

			var currentUser = _.find(app.room.props.attendees, function(item) {
			    return item.id == id;
			});
			var message = currentUser.pseudo+' : '+ response;
			app.socket.io.emit('answered',ent.encode(message));
		}

	}
}
