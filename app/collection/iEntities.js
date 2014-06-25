define(function (require, exports, module) {
  var entities =
        new (require('app/collection/baseCollection').extend(
          {'model' : require('app/model/entitie')
          ,'name'  : 'entities'
          }
        ))();

  //導出
  module.exports = entities;
});