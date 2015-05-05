Meteor.methods({
    login: function (email, password) {
        var md5 = "8982065e30ea02cf02e93a83824cf65b7de1e69545ce8bed4f2bb3c98a862b70";
        var url = "https://api-staging.vietnamworks.com";
        var returnJson = {
            status: 400,
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

            if (result.statusCode == 200) {
                var content = JSON.parse(result.content);

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
                returnJson.userHasMatchingScore = isUserHavingMatchingScoreJson.data.has_matching_info;

                return returnJson;
            } else {
                return returnJson;
            }
        } catch (e) {
            console.error(e);
            return returnJson;
        }
    }
});