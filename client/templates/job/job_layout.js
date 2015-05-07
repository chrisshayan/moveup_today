var jobSub = null;
var callMatchingScore = function () {
    Meteor.call('getUserMatchingScoreInformation', Session.get('userInformation').userId, function (error, matchingScoreInfo) {
        if (matchingScoreInfo.data.matching_info.jobTitle != Session.get('matchingScoreInfo').data.matching_info.jobTitle) {
            Session.set('matchingScoreInfo', matchingScoreInfo);
            jobSub.stop();
            jobSub = Meteor.subscribe('userJobs', Session.get('userInformation').userId);
        }
    })
};

Template.jobLayout.created = function () {
    if (jobSub == null) {
        jobSub = Meteor.subscribe('userJobs', Session.get('userInformation').userId);
    } else {
        callMatchingScore();
    }
};

Template.jobLayout.events({
    'focus .pubSubHook': function () {
        alert('test');
    }
});

Template.jobLayout.rendered = function () {
    $(window).focus(function () {
        callMatchingScore();
    });

    //Company Benefits Toggle - This is used to init the collapse/expanse functionality for the job benefits
    $('.toggle-job-brief a').click(function (e) {
        e.preventDefault();
    });
    $('.toggle-job-brief').click(function () {
        $(this).next('.benefits-info').slideToggle('normal')
        $(this).find('.fa-caret-down, .fa-caret-up').toggleClass('fa-caret-down fa-caret-up');
    });
    // Company Benefits Toggle /**/
};

Template.jobLayout.destroyed = function () {
    $(window).off('focus');
};

Template.jobLayout.helpers({
    jobs: function () {
        return Jobs.find();
    }
});