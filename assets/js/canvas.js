
//Init mouse props
var mouse = {
    click: false,
    move: false,
    pos: {x:0, y:0},
    pos_prev: false
};
var canvas  = document.getElementById('canvas_container');
var context = canvas.getContext('2d');

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

function mainLoop() {
    if (mouse.click && mouse.move && mouse.pos_prev) {
        socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev ] });
        mouse.move = false;
    }
    mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
    setTimeout(mainLoop, 25);
}
mainLoop();

socket.on('draw_line', function (data) {
    var line = data.line;
    context.strokeStyle = $('#paint-color-value').val();
    context.lineJoin = "round";
    context.lineWidth = $('#paint-size-value').val();console.log('receive',context.lineWidth);
    context.beginPath();
    context.moveTo(line[0].x, line[0].y );
    context.lineTo(line[1].x, line[1].y);
    context.stroke();

});
