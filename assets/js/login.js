$(function(){
    var socket  = io.connect();
    $('#connect').click(function(){
        socket.emit('subscribe',$(this).val());
    });

    socket.on('subscribed',function(){
        window.location ='/game';
    });
});



