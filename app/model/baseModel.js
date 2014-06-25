//基本資料Model (共用)
define(function (require, exports, module) {
  var model =
    require('backbone').Model.extend(
      {'fetch' : $.noop
      ,'save'  : $.noop
      }
    );

  //導出
  module.exports = model;
});