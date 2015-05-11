var md5 = Meteor.settings.apiConsumerKey;
var url = Meteor.settings.apiUrl;

var getUserMatchingScoreInformation = function(userId) {

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

Meteor.publish('userJobs', function(userId, jobTitle) {
    var searchJobTitleKeyWord = jobTitle.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    //console.log(userId, jobTitle);
    return Jobs.find({jobTitle: { $regex: searchJobTitleKeyWord, $options: "i"}});
});