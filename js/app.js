$(document).ready(function(){
    $(".menu").on('click', function() {
        $(this).toggleClass('is-active');
        $(this).toggleClass('is-inactive');
    });
});