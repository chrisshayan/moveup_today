var requireLogin = function () {
    if (Session.get('isUserLogin')) {
        this.next();
    } else {
        throwError('You need to login first.');
        Router.go('signinLayout');
    }
};

var isUserLogin = function () {
    return Session.get('isUserLogin');
}

Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
});


Router.route(
    '/', function () {
        GAnalytics.pageview();
        this.render('homeLayout');
    }, {name: 'homeLayout'});
Router.route(
    '/sign-in', function () {
        GAnalytics.pageview();
        GAnalytics.pageview('signinLayout');

        this.render('signinLayout');
    }, {name: 'signinLayout'});

Router.route(
    '/jobs/', function () {
        GAnalytics.pageview();
        GAnalytics.pageview('jobLayout');

        if (Session.get('isUserLogin')) {
            this.render('jobLayout');
        } else {
            throwError('You need to login first.');
            Router.go('signinLayout');
        }

    }, {name: 'jobLayout'}
);

Router.onBeforeAction(function () {
    clearErrors();
    this.next();
});

Router.onBeforeAction(requireLogin, {only: 'jobLayout'});
Router.onBeforeAction(function () {
    if (isUserLogin() === true) {
        Router.go('jobLayout');
    } else {
        this.next();
    }
}, {only: 'signinLayout'})
