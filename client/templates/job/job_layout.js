var checkMatchingInfoChanges = function () {
    Meteor.call('getUserMatchingScoreInformation', Session.get('userInformation').userId, function (error, matchingInfo) {
        if (matchingInfo.data.matching_info.jobTitle != Session.get('matchingScoreInfo').data.matching_info.jobTitle) {
            Session.set('matchingScoreInfo', matchingInfo);
        }
    });
};
Template.jobLayout.created = function() {
    var instance = this;
    // check latest status of matching score information
    checkMatchingInfoChanges();
    // setup subscribe to userJobs publication that depends on matchingScoreInfo session
    instance.autorun(function () {
        var jobTitle = Session.get('matchingScoreInfo').data.matching_info.jobTitle;
        var jobId = Session.get('userInformation').userId;
        var subscription = instance.subscribe('userJobs', jobId, jobTitle);
        subscription.ready();
    });
}
Template.jobLayout.rendered = function () {
    //Company Benefits Toggle - This is used to init the collapse/expanse functionality for the job benefits
    $('.toggle-job-brief a').click(function (e) {
        e.preventDefault();
    });
    $('body').on('click','.toggle-job-brief',function(){
        $(this).next('.benefits-info').slideToggle('normal');
        $(this).find('.fa-caret-down, .fa-caret-up').toggleClass('fa-caret-down fa-caret-up');
    })

    $(window).focus(function () {
        checkMatchingInfoChanges();
    });

    if (Session.get('isUserLogin') !== true) {
        $('#logout').hide();
    } else {
        $('#logout').show();
    }
};

Template.jobLayout.destroyed = function () {
    $(window).off('focus');
};

Template.jobLayout.helpers({
    jobs: function () {
        var jobList = Jobs.find().fetch();
        var params = [Session.get('userInformation').userId];
        _.each(jobList, function(job) {
            params.push(job.jobId);
        });
        if (params.length > 1) {
            try {
                var result = ReactiveMethod.call("getMatchingScore", params);
                if (!!result) {
                    _.map(jobList, function(job) {
                        if (_.has(result, job.jobId)) {
                            job.matchingScore = Math.round(result[job.jobId]);
                        } else {
                            job.matchingScore = 'N/A';
                        }
                    });
                    return jobList;
                }
            } catch (e) {
                console.log(e);
            }
        }
        return [];
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