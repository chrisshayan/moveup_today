Template.signinLayout.events({
    'submit form': function(event, template) {
        event.preventDefault();
        clearErrors();
        Meteor.call("vietnamworksLogin", event.target.username.value, event.target.password.value, function (error, result) {
        console.log(result);
            if(result.status == 200) {
                //save information to session
                Session.set('user', result);
                if(result.userHasMatchingScore) {

                } else {
                    throwError("Your account does not have enough information for Matching Score. Update in <a href='http://www.vietnamworks.com/my-career-center'>here.</a>");
                }
                //go to dashboard page
                Router.go('home_layout');
            } else {
                throwError("Username or password is incorrect. Please ensure your account is also activated.");
            }
        });
    }
});