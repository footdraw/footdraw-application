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
    $('#msg-list').append('<li class="list-group-item"><b>'+message.pseudo+'</b> : '+message.response +'</li>');
    $('#msg').val('');
});

socket.on('winner found',function(winner){
  swal({
    title : 'Jeu terminé',
    text : 'Le gagnant est '+winner.pseudo+' et la bonne réponse était : '+winner.word,
    showCancelButton: false,
    showConfirmButton: true,
    closeOnConfirm: false,
    confirmButtonText : 'Je veux rejouer !',
    html : true
  },function(isConfirm){
    console.log('rejouer');
  });
});

socket.on('time end',function(winner){
  swal({
    title : 'Jeu terminé',
    text : 'Le temps est terminé. Aucun gagnant ! :(',
    showCancelButton: false,
    showConfirmButton: true,
    closeOnConfirm: false,
    confirmButtonText : 'Je veux rejouer !',
    html : true
  },function(isConfirm){
    console.log('rejouer');
  });
});
