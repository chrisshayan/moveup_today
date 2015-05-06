var jobSub = null;
var callMatchingScore = function() {
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
    'focus .pubSubHook': function() {
        alert('test');
    }
});

Template.jobLayout.rendered = function(){
    $(window).focus(function() {
        callMatchingScore();
    });
};

Template.jobLayout.destroyed = function(){
    $(window).off('focus');
};

Template.jobLayout.helpers({
    jobs: function () {
        return Jobs.find();
    }
});