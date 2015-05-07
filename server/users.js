var md5 = "2ed19d9c84fa9280fe6fa1a9e58de807a9d076646de8327c53fc8ed64ca4e268";
var url = "https://api-staging.vietnamworks.com";

Meteor.methods({
    vietnamworksLogin: function (email, password) {
        var returnJson = {
            status: 400,
            token: "",
            userId: 0,
            userHasMatchingScore: false
        };

        try {
            this.unblock();
            var result = Meteor.http.call(
                "POST",
                url + "/users/login", {
                    headers: {
                        "content-type": "application/json",
                        "Accept": "application/json",
                        "content-md5": md5
                    },
                    data: {
                        "user_email": email,
                        "user_password": password
                    }
                }
            );

            var content = JSON.parse(result.content);
            if (result.statusCode == 200 && content.meta.message != "Failed") {
                var isUserHavingMatchingScore = Meteor.http.call(
                    "POST",
                    url + "/users/has-matching-info/?token=" + content.data.profile.login_token, {
                        headers: {
                            "content-type": "application/json",
                            "Accept": "application/json",
                            "content-md5": md5
                        }
                    }
                );
                var isUserHavingMatchingScoreJson = JSON.parse(isUserHavingMatchingScore.content);
                console.log(email + ":" + isUserHavingMatchingScoreJson.data.has_matching_info);

                returnJson.status = 200;
                returnJson.token = content.data.profile.login_token;
                returnJson.userId = content.data.profile.user_id;
                returnJson.userHasMatchingScore = isUserHavingMatchingScoreJson.data.has_matching_info;
            }
        } catch (e) {
            console.error(e);
        }

        return returnJson;
    },

    getMatchingScore : function() {
        if (arguments.length < 2) {
            throw new Meteor.Error("invalid-arguments", "You need to have at least one job seeker id as first parameter and min one job id");
        }

        var args = Array.prototype.slice.call(arguments);
        var userId = arguments[0];
        var jobIds = args.splice(1, arguments.length);

        jobIds = jobIds.map(function(element) {
            return 'jobId[]=' + element;
        });

        var jobQuery = jobIds.join("&");

        try {
            this.unblock();

            console.log(url + "/jobs/matching-score/?userId=" + userId + "&" + jobQuery);

            var result = HTTP.get(
                url + "/jobs/matching-score/?userId=" + userId + "&" + jobQuery, {
                    headers: {
                        "content-type": "application/json",
                        "Accept": "application/json",
                        "content-md5": md5
                    }
                }
            );
        } catch (e) {
            throw new Meteor.Error("rest-api-failed", "Failed to call the REST api on VietnamWorks");
        }

        var content = JSON.parse(result.content);
        console.log(content);

        if(content.meta.code == 200) {
            return content.data.matchingScore;
        } else {
            throw new Meteor.Error("rest-api-failed", content.meta.code + ", message:" + content.meta.message);
        }


    }
});