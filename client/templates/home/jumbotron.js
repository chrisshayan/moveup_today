Template.jumbotron.rendered = function(){
    $('body').addClass('home-page');
};

Template.jumbotron.destroyed = function(){
    $('body').removeClass('home-page')
};

Template.jumbotron.helpers({
  shareData: function() {
      return {
          title: 'Move Up To Day - Kinh nghiệm tối ưu cho người tìm việc',
          summary: 'Move Up To Day - Kinh nghiệm tối ưu cho người tìm việc - Được phát triển bởi VietnamWorks',
          url: 'http://moveup.today.com',
          image: 'http://images.vietnamworks.com/img/thumbnail.png'
      }
  }
});