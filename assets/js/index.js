var mouse = {
    click: false,
    move: false,
    pos: {x:0, y:0},
    pos_prev: false
};
var canvas  = document.getElementById('drawing');
var context = canvas.getContext('2d');
var socket  = io.connect();

canvas.onmousedown = function(e){
    mouse.click = true;
};

canvas.onmousemove = function(e){
    mouse.pos.x = e.clientX - this.offsetLeft;
    mouse.pos.y = e.clientY- this.offsetTop;
    mouse.move = true;
};

canvas.onmouseup = function(e){
    mouse.click = false;
};

socket.on('draw_line', function (data) {
    var line = data.line;
    context.strokeStyle = $('#paint-color-value').val();
    context.lineJoin = "round";
    context.lineWidth = $('#paint-size-value').val();
    context.beginPath();
    context.moveTo(line[0].x, line[0].y );
    context.lineTo(line[1].x, line[1].y);
    context.stroke();
});

socket.on('a word selected',function(word){
    $('#word').html(word);
});

function mainLoop() {
    if (mouse.click && mouse.move && mouse.pos_prev) {
        socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev ] });
        mouse.move = false;
    }
    mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
    setTimeout(mainLoop, 25);
}
mainLoop();

$(function(){
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
});

//$(this).disabled;
var time = 90;
var timeRemain;
$('#btn-play').on('click',function(){
    $(this).attr('disabled','disabled');
    timeRemain = setInterval(displayRemainTime,1000);
});

function displayRemainTime(){
    var  minutesToDisplay = formatTime(parseInt(time/60,10)) ;
    var secondsToDisplay =  formatTime(parseInt(time%60,10)) ;
    $('#timeRemainDiv').html(minutesToDisplay+' : '+secondsToDisplay);
    --time;
    if(time<0){
        clearInterval(timeRemain);
        console.log(time);
    }
}

function formatTime(unit){
    return (unit<10)? '0'+unit : unit;
}