Template.social.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
        Session.set('isUserLogin', true);
    },

    'click #linkedin-login': function(event) {
        Meteor.loginWithLinkedin({}, function(err){
            if (err) {
                console.log(err);
                throw new Meteor.Error("LinkedIn login failed");
            }

            var emailAddress = Meteor.user().profile.emailAddress;
            Meteor.call("getAccountStatus", emailAddress, function(errors, accountStatusResult) {
                if(accountStatusResult.meta.code === 200) {
                    if(accountStatusResult.data.accountStatus === Meteor.settings.public.accountStatus.new_user) {
                        Meteor.call("registerAccount", emailAddress, Meteor.user().profile.firstName,
                                                       Meteor.user().profile.lastName, function(registerError, registerResult) {
                                if(registerResult.meta.code === 200 && registerResult.meta.message === 'Success') {
                                    var newUserId = registerResult.data.userID;
                                    Meteor.call("updateMatchingScoreInformation", newUserId, Meteor.user().profile.headline,
                                            function(e, r) {
                                                console.log("userId=" + newUserId);
                                                Meteor.call("getUserMatchingScoreInformation", newUserId, function(errors, msResult) {
                                                    console.log(msResult);
                                                    var userInformation = {
                                                        status: 200,
                                                        token: "",
                                                        userId: newUserId,
                                                        userHasMatchingScore: true
                                                    };

                                                    Session.set('isUserLogin', true);
                                                    Session.set('userInformation', userInformation);
                                                    Session.set('matchingScoreInfo', msResult);
                                                    Router.go('jobLayout');
                                                });
                                            });
                                } else {
                                    throw new Meteor.Error(registerResult.meta.message);
                                }
                            } )
                    }
                }
            });
        });
    },

    'click #logout': function(event) {
        Session.set('isUserLogin', false);
        Session.set('userInformation', null);

        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
});
