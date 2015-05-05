Router.configure({
    layoutTemplate: 'layout'
});

Router.map (function(){
    this.route('home_layout', {
        path: '/'
    });
    this.route('signin_layout', {
            path: '/sign-in'
        });
   }
);