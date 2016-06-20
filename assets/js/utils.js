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
  });

  socket.on('close alert',function(){
    socket.emit('popup closed');
    swal.close();
  });

  socket.on('remain time',function(time){
    displayRemainTime(time);
  });
}

function displayRemainTime(time){
  var minutesToDisplay = formatTime(parseInt(time/60,10)) ;
  var secondsToDisplay = formatTime(parseInt(time%60,10)) ;
  $('.time .countDown').html(minutesToDisplay+' : '+secondsToDisplay);
}

function formatTime(unit){
  return (unit<10)? '0'+unit : unit;
}
