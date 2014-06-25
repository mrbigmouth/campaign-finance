define(function (require, exports, module) {
  var router = new require('backbone').Router();

  //首頁
  router.route('/', 'home', function() {
    console.log('home!!!');
  });

  //導出路由
  module.exports = router;
});