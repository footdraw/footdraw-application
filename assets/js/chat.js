function answer(){
    var  msg = $('#msg').val().trim();
    (msg.length!==0)? socket.emit('answer',msg) : '';

}

$(document).on('keyup',function(ev){
    if(ev.keyCode ===13) answer();
});

$('#send').click(function(){
    answer();
});

socket.on('answered',function(message){
    $('#msg-list').append('<li class="list-group-item">'+message+'</li>');
    $('#msg').val('');
});
