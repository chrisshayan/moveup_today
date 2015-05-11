Template.noJobFoundLayout.onRendered(function () {
    $('body').addClass('no-job-found')
    var winHeight = $('html').height();
    var calculatedHeight = winHeight - $('.header').height() - $('.footer').height();
    $('section.no-job-found .container').height(calculatedHeight)
    console.log(calculatedHeight);

});

Template.noJobFoundLayout.onDestroyed(function () {
    $('body').removeClass('no-job-found')
})