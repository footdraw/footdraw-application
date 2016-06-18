var time = 90;
var timeRemain;


//Game start
socket.on('game start',function(word){
    $('#instructions').html(word);
    timeRemain = setInterval(displayRemainTime,1000);
});
//Enable chat  for others players
socket.on('player start',function(word){
    $('#msg').prop('disabled',false);
});


//Disable chat for current drawer
socket.on('disable chat',function(){
  $('#msg').prop('disabled',true);
  console.log('disable chat, Im drawer')
});
