function answer(msg){
    socket.emit('answer',$('#msg').val());
}

$(document).on('keyup',function(ev){
    if(ev.keyCode ===13) answer();
});

$('#send').click(function(){
    answer();
});
socket.on('answered',function(message){
    $('#msg-list').append('<li>'+message+'</li>');
    $('#msg').val('');
});
