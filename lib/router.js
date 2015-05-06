Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function () {
        this.route('home_layout', {
            path: '/'
        });
        this.route('signin_layout', {
            path: '/sign-in'
        });
        this.route('jobListLayout', {
            path: '/job-list'
        });
    }
);

Router.onBeforeAction(function () {
    clearErrors();
    this.next();
});