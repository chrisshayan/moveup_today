Template.signinLayout.events({
    'submit form': function(event, template) {
        event.preventDefault();
        clearErrors();
        Meteor.call("vietnamworksLogin", event.target.username.value, event.target.password.value, function (error, result) {
            if(result.status == 200) {
                if(result.userHasMatchingScore) {
                    Session.set('isUserLogin', true);
                    Session.set('userInformation', result);

                    Meteor.call('getUserMatchingScoreInformation', result.userId, function(error, matchingScoreInfo) {
                        Session.set('matchingScoreInfo', matchingScoreInfo);
                    });
                } else {
                    throwError("Your account does not have enough information for Matching Score. Update in <a href='http://www.vietnamworks.com/my-career-center'>here.</a>");
                }
            } else {
                throwError("Username or password is incorrect. Please ensure your account is also activated.");
            }
        });
    }
});