/**
 * Created by tuanna on 5/7/2015.
 */
Template.header.events({
    'click #logout': function(event, template){
        Session.set('isUserLogin', null);
        Session.set('userInformation', null);
        Session.set('matchingScoreInfo', null);
        Meteor.logout();
        Router.go('/');
    }
});
