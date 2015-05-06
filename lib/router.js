Router.configure({
    layoutTemplate: 'layout'
});


Router.route(
    '/', function () {
        GAnalytics.pageview();
        this.render('home_layout');
    }, {name: 'home_layout'});

Router.route(
    '/sign-in', function () {
        GAnalytics.pageview();
        GAnalytics.pageview('signin_layout');

        this.render('signin_layout');
    }, {name: 'signin_layout'});

Router.onBeforeAction(function () {
    clearErrors();
    this.next();
});
