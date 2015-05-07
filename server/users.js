Meteor.methods({
    vietnamworksLogin: function (email, password) {
        var md5 = "2ed19d9c84fa9280fe6fa1a9e58de807a9d076646de8327c53fc8ed64ca4e268";
        var url = "https://api-staging.vietnamworks.com";
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
        console.log(arguments);
    }
});