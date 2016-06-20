var time               = 90;
var timeRemain         ='';

function connectUser(username){
  socket.emit('subscribe',username.trim());
  //if players number require is unreach
  socket.on('ok waiting',function(users){
    var userslist      = '<br><ul>';
    users.forEach(function(user){
      userslist +='<li>'+user+'</li>';
    });
    userslist +='</ul>';
    swal({
      title : 'Vous êtes maintenant connecté !',
      text : 'Veuillez patienter quelques minutes'+userslist,
      showCancelButton: false,
      showConfirmButton: false,
      closeOnConfirm: false,
      html : true
    });
  });

  //if players number is reach
  socket.on('you draw',function(){
    socket.emit('drawer ready');
    console.log('i draw');
  });
  socket.on('close alert',function(){
    swal.close();
    timeRemain         = setInterval(displayRemainTime,1000);
    console.log('close alert');
  });
}

function displayRemainTime(){
  var minutesToDisplay = formatTime(parseInt(time/60,10)) ;
  var secondsToDisplay = formatTime(parseInt(time%60,10)) ;
  $('.time .countDown').html(minutesToDisplay+' : '+secondsToDisplay);
  --time;
  if(time<=0){
    clearInterval(timeRemain);
    clearInterval(this);
    time               = 0;
    //Emit event to stop game
    socket.emit('time elapsed');
    return false;
  }
}

function formatTime(unit){
  return (unit<10)? '0'+unit : unit;
}
