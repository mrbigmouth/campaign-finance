define(function (require, exports, module) {
  var codes =
        new (require('app/collection/baseCollection').extend(
          {'model' : require('app/model/code')
          ,'name'  : 'codes'
          }
        ))();

  //導出
  module.exports = codes;
});