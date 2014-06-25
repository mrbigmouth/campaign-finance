//基本資料Collection (共用)
define(function (require, exports, module) {
  var collection = 
    require('backbone').Collection.extend(
      {'name'       : ''
      ,'domain'     : require('config').DataDomain
      ,'initialize' :
          function() {
            this.url = 'http://' + this.domain + '/' + this.name + '/';
            return this;
          }
      ,'fetch'  :
          function() {
            var _this = this;
            return require('jquery').ajax(
              {'url'      : this.url
              ,'type'     : 'get'
              ,'dataType' : 'jsonp'
              ,'cache'    : true
              }
            )
            .done(function(data) {
              _this.reset(data);
            });
          }
      }
    );

  //導出
  module.exports = collection;
});