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
          summary: 'Move Up To Day. Kinh nghiệm tối ưu cho người tìm việc. Được phát triển bởi VietnamWorks. Real-Time Job Matching cung cấp các cơ hội việc làm phù hợp nhất mà bạn không cần phải tìm kiếm',
          url: 'http://moveup.today',
          image: 'http://images.vietnamworks.com/img/thumbnail.png'
      }
  }
});