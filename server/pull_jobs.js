pullJobs = function(period) {
    var md5 = "2ed19d9c84fa9280fe6fa1a9e58de807a9d076646de8327c53fc8ed64ca4e267";
    var url = "https://api-staging.vietnamworks.com";
    try {
        var result = HTTP.get(
            url + "/jobs/fetch/?period=" + period,
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
            if (content.data && content.data.total > 0) {
                _.each(content.data.jobs, function(job) {
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
            }
        }
    }catch (e) {
        console.log(e);
    }
};