define(function (require, exports, module) {
  var politicians =
        new (require('app/collection/baseCollection').extend(
          {'model' : require('app/model/politician')
          ,'name'  : 'politicians'
          }
        ))();

  //導出
  module.exports = politicians;
});