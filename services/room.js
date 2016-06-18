var ent = require('ent');
var _ = require('underscore');
module.exports = function(app){
    return{
       init : function() {
           if(!app.room['props']){
               app.room.props = {
                   'name':'footDraw',
                   'attendees':[],
                   'word':  app.randomize.selectWord().toString(),
                   'drawer': '',
               };
           }
       },
        subscription : function(pseudo) {
            var userPseudo = ent.encode(pseudo) ;
            this.join(app.room.props.name);
            app.room.populateSocket(userPseudo,this.id);
            var usersConnected = _.map(app.room.props.attendees,function(user){
              return user.pseudo;
            });
            app.socket.io.emit('ok waiting',usersConnected);
        },
        populateSocket: function(pseudo,id){
             var data =   {
                 'id':id,
                 'pseudo':pseudo,
                 'role':'player',
                 'response':'null',
                 'rank':'null'
             };
           app.room['props'].attendees.push(data);
        },
        waitingList : function(){

        },
        start : function(){
            var drawer = _.sample(app.room.props.attendees);
            app.room.props.drawer = drawer.id;
            var drawerInstruction = "Le mot a dessiner est : "+app.room.props.word ;
            var playerInstruction = "Demarrez ! Vous avez 1min30 pour deviner le mot";
            app.socket.io.emit('drawer start',drawerInstruction);
            app.socket.io.sockets.connected[drawer.id].emit('disable chat');
            app.socket.io.sockets.connected[drawer.id].emit('disable chat');
            this.broadcast.emit('player start',playerInstruction);
            //compare and rank player
        }
     }

}
