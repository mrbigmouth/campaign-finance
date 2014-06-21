define(function (require, exports, module) {
  var App = {};
  //程式啟動
  App.start =
    function() {
      require('backbone').history.start({'pushState' : true});
    }
  //導頁alias
  App.go =
    function(url) {
      require('app/route').navigate(url, {'trigger' : true});
    }
  window.App = App;
  module.exports = App;
});