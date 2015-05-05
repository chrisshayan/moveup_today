Template.jumbotron.rendered = function(){
    $('body').addClass('home-page')
};

Template.jumbotron.destroyed = function(){
    $('body').removeClass('home-page')
};