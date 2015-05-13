SyncedCron.options = {
    log: false,
    collectionName: 'cronHistory',
    utc: false,
    collectionTTL: 172800
};

var addJob = function () {
    SyncedCron.add({
        name: 'Pull new jobs from vietnamworks',
        schedule: function(parser) {
            return parser.text('every 30 seconds');
        },
        job: function() {
            // Pull the jobs of last times into Jobs mongodb collection
            pullJobs(Meteor.settings.private.timeLatestJobs);
        }
    });
};

Meteor.startup(function() {
    addJob();
    SyncedCron.start();
});