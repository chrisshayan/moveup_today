Template.signinLayout.events({
    'submit form': function(event, template) {
        event.preventDefault();

        Meteor.call("login", event.target.username.value, event.target.password.value, function (error, result) {
            console.log(result);
        });
    }
});