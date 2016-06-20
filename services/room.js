var ent   = require('ent');
var _     = require('underscore');
var fuzzy = require('fuzzy');
module.exports = function(app){
  return{
    init : function() {
      if(!app.room['props']){
        app.room.props  = {
          'name':'footDraw',
          'attendees':[],
          'word': app.randomize.selectWord().toString(),
          'drawer': '',
          'previousWinner' : ''
        };
      }
      app.room.endGame = false;
    },
    subscription : function(pseudo) {
      var userPseudo = ent.encode(pseudo) ;
      this.join(app.room.props.name);
      app.room.populateSocket(userPseudo,this.id);
      (!app.room.isRequirePlayersInRoom())? app.room.sendWaitingList() : app.room.notifyDrawer();
    },
    isRequirePlayersInRoom : function(){
      return (app.room.props.attendees.length >= app.config.game.minPlayers)? true : false;
    },
    populateSocket: function(pseudo,id){
      var socketExist = _.find(app.room.props.attendees,function(item){
        return item.id == id;
      });

      if(socketExist) return;
      var data  = {
        'id':id,
        'pseudo':pseudo,
        'response':'null',
        'rank':'null'
      };
      app.room['props'].attendees.push(data);
    },
    sendWaitingList : function(){
      var usersConnected   = _.map(app.room.props.attendees,function(user){
        return user.pseudo;
      });
      app.socket.io.emit('ok waiting',usersConnected);
    },
    notifyDrawer : function(){
      //Choose the drawer
      var drawer   = {};
      if(app.room.props.previousWinner.length>0){
        drawer.id = app.room.props.previousWinner;
      }else{
        drawer     = _.sample(app.room.props.attendees);
      }

      if(typeof drawer.id !=='undefined' && typeof app.socket.io.sockets.connected[drawer.id] !=='undefined'){
        app.room.props.drawer = drawer.id;
        app.socket.io.sockets.connected[drawer.id].emit('disable chat');
        app.socket.io.sockets.connected[drawer.id].emit('you draw');
      }
    },
    checkResponse : function(response,id){
      var tabWord = [app.room.props.word];
      var results = fuzzy.filter(response,tabWord);
			var matches = results.map(function(el){ return el.string});
      if(matches.length>0){
        app.room.storeWinner(id);
        app.room.endGame = true;
        return true;
      }
			return false;
    },
    getUserPseudo : function(id){
      var currentUser  = _.find(app.room.props.attendees, function(item) {
				return item.id == id;
			});
      return typeof currentUser != 'undefined'? currentUser.pseudo : false;

    },
    storeWinner : function(id){
      app.room.props.previousWinner = id;
    },
    resetWinner : function(){
      app.room.props.previousWinner = '';
      app.room.props.attendees = [];
      app.room.props.drawer = '';
    },
    startGame : function(){
      this.broadcast.to(app.room.props.name).emit('close alert');
      app.socket.io.emit('close alert');

      var drawerInstruction                    = "Le mot a dessiner est : " + app.room.props.word ;
      app.socket.io.emit('go drawer',drawerInstruction);
      var playerInstruction                    = "Demarrez ! Vous avez 1min30 pour deviner le mot";
      this.broadcast.emit('go player',playerInstruction);
    },
    getRemainTime : function(){
      var time = app.config.game.time;
      var timeRemain = setInterval(function(){
        app.socket.io.emit('remain time', --time);console.log(app.room.endGame);
        if(time<=0 || app.room.endGame){
          clearInterval(timeRemain);
          clearInterval(this);
          if(! app.room.endGame && app.room.props.previousWinner.length>0) app.socket.io.emit('time end');
          app.socket.io.emit('remain time',0);
          app.room.resetWinner();
          app.room.endGame = false;
          return ;
        }
      },1000);
    }
  }

}
