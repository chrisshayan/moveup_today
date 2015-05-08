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
                console.log(accountStatusResult);
            });

            /*Meteor.call("getUserIdByEmailAddress", emailAddress, function(errors, result) {
                Meteor.call("getUserMatchingScoreInformation", result.userId, function(errors, msResult) {
                    console.log(msResult);

                    Session.set('isUserLogin', true);
                    Session.set('userInformation', result);
                    Session.set('matchingScoreInfo', msResult);
                    Router.go('jobLayout');
                });
            });*/
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
