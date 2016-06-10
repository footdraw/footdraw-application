module.exports = function(app){
	return{
		draw_line : function(msg){
			app.socket.io.emit('draw_line',msg);
		},
		leave : function(point){
			app.socket.io.emit('leave',point);
		}
	}
}