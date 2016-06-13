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
            app.socket.io.emit('subscribed');
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
        start : function(){
            var drawer = _.sample(app.room.props.attendees);
            app.room.props.drawer = drawer.id;
            var drawerInstruction = "Le mot à dessiner est : "+app.room.props.word ;
            var playerInstruction = "Démarrez ! Vous avez 1min30 pour deviner le mot";
            app.socket.io.emit('game start',drawerInstruction);
            this.broadcast.emit('game start',playerInstruction);
            //compare and rank player
        }
     }

}