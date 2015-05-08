/**
 * Created by tuanna on 5/7/2015.
 */
Template.header.events({
    'click #logout': function(){
        Session.set('isUserLogin', null);
        Session.set('userInformation', null);
        Session.set('matchingScoreInfo', null);
        Meteor.logout();
        Router.go('/');
    }
});
Template.header.helpers({
   'userLogin' : function() {
       if (Session.get('isUserLogin') == true){
           return true;
       }
       return false;
   }
});
