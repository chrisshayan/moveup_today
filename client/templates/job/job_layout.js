var jobSub = null;
var callMatchingScore = function () {
    Meteor.call('getUserMatchingScoreInformation', Session.get('userInformation').userId, function (error, matchingScoreInfo) {
        if (matchingScoreInfo.data.matching_info.jobTitle != Session.get('matchingScoreInfo').data.matching_info.jobTitle) {
            Session.set('matchingScoreInfo', matchingScoreInfo);
            jobSub.stop();
            jobSub = Meteor.subscribe('userJobs', Session.get('userInformation').userId);
        }
    });
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
    }
});

Template.jobLayout.rendered = function () {
    //Company Benefits Toggle - This is used to init the collapse/expanse functionality for the job benefits
    $('.toggle-job-brief a').click(function (e) {
        e.preventDefault();
    });
    $('.toggle-job-brief').click(function () {
        $(this).next('.benefits-info').slideToggle('normal');
        $(this).find('.fa-caret-down, .fa-caret-up').toggleClass('fa-caret-down fa-caret-up');
    });
    // Company Benefits Toggle /**/

    $(window).focus(function () {
        callMatchingScore();
    });
};

Template.jobLayout.destroyed = function () {
    $(window).off('focus');
};

Template.jobLayout.helpers({
    jobs: function () {
        return Jobs.find();
    },

    benefitClass: function () {
        return Meteor.settings.public.benefitIcons[this.benefitId-1].iconClass;
    },

    jobUrl: function() {
        return Meteor.settings.public.jobDomain + '/' + this.alias + "-jd";
    },

    formatDate: function() {
        var approvedDate = new Date(this.approvedDate);
        return moment(approvedDate).format('DD/MM/YYYY');
    }
});

//get last element of array
Template.registerHelper('last',
    function(list, elem) {
        return _.last(list) === elem;
    }
);