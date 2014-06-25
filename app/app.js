define(function (require, exports, module) {
  var App   = {}
    , data  = require('app/data')
    ;
  //程式啟動
  App.start =
    function() {
      require('backbone').history.start({'pushState' : false});
    }
  //導頁alias
  App.go =
    function(url) {
      require('app/route').navigate(url, {'trigger' : true});
    }
  //載入初始資料
  var loaded = {};
  App.load =
    function(which) {
      var undefined;

      //要載入何種資料
      switch (which) {
      case 'codes' :
        if (loaded.codes === undefined) {
          loaded.codes = require('app/collection/iCodes').fetch();
        }
        return loaded.codes;
        break;
      //預設載入politicians與entities
      default :
        if (loaded.default === undefined) {
          loaded.default =
              $.when( require('app/collection/iPoliticians').fetch()
                    , require('app/collection/iEntities').fetch()
                    );
        }
        return loaded.default;
        break;
      }
    }
  //導出到window上方便debug
  App.data = data;
  window.App = App;
  module.exports = App;
});