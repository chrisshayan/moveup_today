pullJobs = function(period) {
    var md5 = "8982065e30ea02cf02e93a83824cf65b7de1e69545ce8bed4f2bb3c98a862b70";
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