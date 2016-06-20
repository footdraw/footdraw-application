$.each(['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#000', '#fff'], function() {
     $('#colors').append("<li class='circle' style='background: " + this + ";'><a nohref class='paint-color'  data-color='" + this + "'></a></li>");
});

$('.paint-color').on('click',function() {
    var color = $(this).attr('data-color');
    $('#paint-color-value').val(color);
});
