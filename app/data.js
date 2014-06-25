define(function (require, exports, module) {
  module.exports =
      {'politicians' : require('app/collection/iPoliticians')
      ,'entities'    : require('app/collection/iEntities')
      ,'codes'       : require('app/collection/iCodes')
      };
});