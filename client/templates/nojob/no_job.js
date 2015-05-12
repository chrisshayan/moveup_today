Template.noJobFoundLayout.onRendered(function () {
    $('body').addClass('no-job-found')
    var winHeight = $('html').height();
    var calculatedHeight = winHeight - $('.header').height() - $('.footer').height();
    $('section.no-job-found .container').height(calculatedHeight)
    $(window).on('resize.noJobPageResize', function () {
        var winHeight = $('html').height();
        var calculatedHeight = winHeight - $('.header').height() - $('.footer').height();
        $('section.no-job-found .container').height(calculatedHeight)
    })

});

Template.noJobFoundLayout.onDestroyed(function () {
    $('body').removeClass('no-job-found')
    $(window).off('resize.noJobPageResize')
})