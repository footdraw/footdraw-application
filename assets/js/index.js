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
