// Company Benefits
Template.jobListLayout.rendered = function () {
    $('.toggle-job-brief a').click(function (e) {
        e.preventDefault();
    });
    $('.toggle-job-brief').click(function () {
        $(this).next('.benefits-info').slideToggle('normal')
        $(this).find('.fa-caret-down, .fa-caret-up').toggleClass('fa-caret-down fa-caret-up');
    })
};