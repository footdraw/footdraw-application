$.each(['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#000', '#fff'], function() {
     $('#colors').append("<li class='circle' style='background: " + this + ";'><a nohref class='paint-color'  data-color='" + this + "'></a></li>");
});

$('.circle').on('click',function() {
    var color = $(this).find('a').attr('data-color');
    console.log(color);
    $('#paint-color-value').val(color);
});
