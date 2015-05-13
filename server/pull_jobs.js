pullJobs = function(period) {
    var md5 = Meteor.settings.private.apiConsumerKey;
    var url = Meteor.settings.private.apiUrl;
    try {
        var offset = 0;
        while (true) {
            var result = HTTP.get(
                url + "/jobs/fetch/?period=" + period + '&offset=' + offset + '&limit=1000',
                {
                    headers: {
                        "Content-type": "application/json",
                        "Accept": "application/json",
                        "Content-md5": md5
                    }
                }
            );
            if (result.statusCode == 200) {
                var content = JSON.parse(result.content);
                if (content.data && content.data.total > 0 && _.size(content.data.jobs) > 0) {
                    _.each(content.data.jobs, function (job) {
                        // check job already exists or not?
                        if (Jobs.find({jobId: job.jobId}).count() == 0) {
                            // convert to Date format
                            job.onlineDate = new Date(job.onlineDate);
                            job.approvedDate = new Date(job.approvedDate);
                            job.expiredDate = new Date(job.expiredDate);
                            // insert to jobs collection
                            Jobs.insert(job);
                        }
                    });
                    offset += _.size(content.data.jobs);
                    if (offset < content.data.total) {
                        continue;
                    }
                }
            }
            break;
        }
    }catch (e) {
        console.log(e);
    }
};