
function displayRemainTime(){
  var  minutesToDisplay = formatTime(parseInt(time/60,10)) ;
  var secondsToDisplay =  formatTime(parseInt(time%60,10)) ;
  $('#timeRemainDiv h3').html(minutesToDisplay+' : '+secondsToDisplay);
  --time;
  if(time<0){
    clearInterval(timeRemain);
    $('#btn-play').removeAttr('disabled');
  }
}

function formatTime(unit){
  return (unit<10)? '0'+unit : unit;
}

function connectUser(username){
  socket.emit('subscribe',username.trim());
  socket.on('ok waiting',function(users){
    var userslist = '<br><ul>';
    users.forEach(function(user){
      userslist +='<li>'+user+'</li>';
    });
    userslist +='<ul>';
    swal({
      title  : 'Vous êtes maintenant connecté !',
      text : 'Veuillez patienter quelques minutes'+userslist,
      showCancelButton: false,
      closeOnConfirm: false,
      html : true
    },function(isClicked){
      socket.emit('play_clicked');
      //swal.close();
    });
  });
}
