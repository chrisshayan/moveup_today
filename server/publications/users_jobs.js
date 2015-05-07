var getUserMatchingScoreInformation = function(userId) {
    var md5 = "2ed19d9c84fa9280fe6fa1a9e58de807a9d076646de8327c53fc8ed64ca4e268";
    var url = "https://api-staging.vietnamworks.com";

    var result = HTTP.get(
        url + "/users/matching-info/?userId=" + userId, {
            headers: {
                "content-type": "application/json",
                "Accept": "application/json",
                "content-md5": md5
            }
        }
    );

    return JSON.parse(result.content);
};

Meteor.methods({
    getUserMatchingScoreInformation: getUserMatchingScoreInformation
});

Meteor.publish('userJobs', function(userId) {

    var content = getUserMatchingScoreInformation(userId);

    if(content.meta.code == 200 && content.meta.message == "Success") {
        return Jobs.find({jobTitle: content.data.matching_info.jobTitle});
    }
});