

//Enable chat	for others players
socket.on('go player',function(word){
  $('#msg').prop('disabled',false);
  $('#instructions').html(word);
});


socket.on('go drawer',function(word){
  $('#instructions').html(word);
  
});


//Disable chat for current drawer
socket.on('disable chat',function(){
  $('#msg').prop('disabled',true);
  console.log('disable chat, Im drawer');
});
