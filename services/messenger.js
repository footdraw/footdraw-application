var ent                = require('ent');
var _                  = require('underscore');
module.exports         = function(app){
	return{
		draw_line : function(msg){
			if(this.id === app.room.props.drawer) app.socket.io.emit('draw_line',msg);
		},
		leave : function(point){
			app.socket.io.emit('leave',point);
		},
		answer : function(response){
			var message      = '';
			var pseudo = app.room.getUserPseudo(this.id)
 			//End game time off / Winner
			if(app.room.checkResponse(response,this.id)){
				message      = {'pseudo' : pseudo,'word' : app.room.props.word};
				app.socket.io.emit('winner found',message);
			}else{
				message      = {'pseudo' : pseudo,'response' : ent.encode(response)};
				app.socket.io.emit('answered',message);
				console.log(message);
			}
		},


	}
}
