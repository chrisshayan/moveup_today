var md5 = Meteor.settings.apiConsumerKey;
var url = Meteor.settings.apiUrl;

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

    getMatchingScore : function(args) {
        if (args.length < 2) {
            throw new Meteor.Error("invalid-arguments", "You need to have at least one job seeker id as first parameter and min one job id");
        }


        var userId = arguments[0];
        var jobIds = args.splice(1, args.length);

        jobIds = jobIds.map(function(element) {
            return 'jobId[]=' + element;
        });

        var jobQuery = jobIds.join("&");

        try {
            this.unblock();

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

        if(content.meta.code == 200) {
            return content.data.matchingScore;
        } else {
            throw new Meteor.Error("rest-api-failed", content.meta.code + ", message:" + content.meta.message);
        }
    },

    getUserIdByEmailAddress: function(email) {
        try {
            var result = HTTP.get(
                url + "/users/user-info/?email=" + email, {
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
        if(content.meta.code == 200 && content.meta.message == 'Success') {
            return content.data;
        }
    },

    /**
     *
     * @param email
     * @returns
     * NEW, ACTIVATED, NON_ACTIVATED, BANNED
     */
    getAccountStatus: function(email) {
        try {
            var result = HTTP.get(
                url + "/users/account-status/?email=" + email, {
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

        return content;
    },

    registerAccount: function(email, firstname, lastname) {
        try {
            var result = Meteor.http.call(
                "POST",
                url + "/users/registerWithoutConfirm", {
                    headers: {
                        "content-type": "application/json",
                        "Accept": "application/json",
                        "content-md5": md5
                    },
                    data: {
                        "email": email,
                        "firstname": firstname,
                        "lastname": lastname
                    }
                }
            );

            var content = JSON.parse(result.content);
            return content;

        } catch (e) {
            throw new Meteor.Error("rest-api-failed", "Failed to call the REST api on VietnamWorks");
        }
    },

    updateMatchingScoreInformation: function(userId, jobTitle) {
        console.log("updateMatchingScoreInformation");

        try {
            var result = Meteor.http.call(
                "POST",
                url + "/users/update-matching-info/?userId=" + userId, {
                    headers: {
                        "content-type": "application/json",
                        "Accept": "application/json",
                        "content-md5": md5
                    },
                    data: {
                        //"jobLevelId": jobLevelId,
                        //"companySizeId": companySizeId,
                        //"salary": salary,
                        //"cityId": cityIds,
                        //"industryId": industryIds,
                        "jobTitle": jobTitle
                    }
                }
            );
            return JSON.parse(result.content);
        } catch(e) {
            throw new Meteor.Error("rest-api-failed", e);
        }
    }
});