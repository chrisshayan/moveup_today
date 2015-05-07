/**
 * Created by tuanna on 5/7/2015.
 */
Template.header.events({
    'click #logout': function(event, template){
        Session.set('isUserLogin', false);
        Session.set('userInformation', false);
        Session.set('matchingScoreInfo', false);
        Router.go('signinLayout');
    }
});