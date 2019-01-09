$('#myTab a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
})


$(window).load(function() {
    var boxheight = $('#myCarousel .carousel-inner').innerHeight();
    var itemlength = $('#myCarousel .item').length;
    var triggerheight = Math.round(boxheight/itemlength+1);
    $('#myCarousel .list-group-item').outerHeight(triggerheight);
});

var monthNames = [ "Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "aout", "Septembre", "Octobre", "Novembre", "Decembre" ];
var dayNames= ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"]

var newDate = new Date();
newDate.setDate(newDate.getDate());
$('#Date').html(dayNames[newDate.getDay()] + ", " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());