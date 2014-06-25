define(function (require, exports, module) {
  var $main  = $('#App')
    , router =
        new (require('backbone').Router.extend(
          {'execute' :
              function(callback, args) {
                //載入初始資料
                App.load();
                //保存所有transaction狀態
                $('body').find('div.transaction').detach();
                callback.apply(this, args);
              }
          }
        ))()
    ;

  //首頁
  router.route(/^(.*)$/, 'default', function(url) {
    $main.empty();
    //搜索form
    require('app/view/iSearch').render($main);
  });

  //搜索
  router.route(/^search\/(.*)$/, 'search', function(text) {
    $main.empty();
    text = decodeURIComponent(text);
    //搜索form
    require('app/view/iSearch').render($main, text);
    //搜索結果
    require('app/view/iResult').render($main, text);
  });

  //政治人物帳戶明細
  router.route(/^politician\/(.*)$/, 'politician', function(id) {
    $main.empty();
    //政治人物帳戶 render
    require('app/view/iPolitician').render($main, id);
  });

  //導出路由
  module.exports = router;
});