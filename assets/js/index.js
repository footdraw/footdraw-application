$.each(['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#000', '#fff'], function() {
     $('.tools').append("<a nohref  data-color='" + this + "' style='width: 10px; background: " + this + ";' class='paint-color'></a> ");
});

$('.paint-color').on('click',function() {
    var color = $(this).attr('data-color');
    $('#paint-color-value').val(color);
});

$('.paint-size').on('click',function() {
    var size = $(this).attr('data-size');
    $('#paint-size-value').val(size);
});

socket.on('game start',function(word){
    $('#instructions').html(word);
    $('#btn-play').attr('disabled','disabled');
    timeRemain = setInterval(displayRemainTime,1000);
});





var time = 90;
var timeRemain;
$('#btn-play').on('click',function(){
    socket.emit('play_clicked');
});

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


$(window).on('touchstart',function(e){
    e.preventDefault();
});

$('#drawing').on('touchstart',function(e){
    console.log('touch');
    mouse.click = true;
});

$('#drawing').on('touchmove',function(e){
    console.log('touch move',e.clientX);
    mouse.pos.x = e.clientX - this.offsetLeft;
    mouse.pos.y = e.clientY- this.offsetTop;
    mouse.move = true;
});
