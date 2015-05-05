//
//
//////////////////////////////

// Smoothwheel
//=================================

/*
$(document).ready(function () {
    var $body = $('body');
    if ($body.width() >= 768) {
        $('.smooth-scroll').smoothWheel()
    }
});
*/


$(window).bind('scroll', function (e) {
    parallaxScroll();
});

function parallaxScroll() {
    var scrolled = $(window).scrollTop();
    $('.bg-layer-1 div').css('top', function () {
        return 240 - scrolled * 0.2
    });
    $('.bg-layer-2 div').css('top', function () {
        return 600 - scrolled * 0.45
    });

}