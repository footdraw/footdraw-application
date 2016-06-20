function answer(){
    var  msg = $('#msg').val().trim();
    (msg.length!==0)? socket.emit('answer',msg) : '';

}

$(document).on('keyup',function(ev){
    if(ev.keyCode ===13) answer();
});

$('#send').click(function(e){
    e.preventDefault();
    answer();
});

socket.on('answered',function(message){
    $('#msg-list').append('<li><span>'+message.pseudo+'</span> : '+message.response +'</li>');
    $('#msg').val('');
});

socket.on('winner found',function(winner){
  swal({
    title : '<i class="yellow huge trophy icon "></i> <br>Jeu terminé',
    text : 'Le gagnant est <b>'+winner.pseudo+'</b> et la bonne réponse était : '+winner.word,
    showCancelButton: false,
    showConfirmButton: true,
    closeOnConfirm: false,
    confirmButtonText : 'Je veux rejouer !',
    html : true
  },function(isConfirm){
    console.log('rejouer');
    window.location.reload();
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
    window.location.reload();
  });
});
