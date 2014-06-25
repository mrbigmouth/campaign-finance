define(function (require, exports, module) {
  var transactions =
        require('backbone').Collection.extend(
          {'model'      : require('app/model/transaction')
          ,'fetch'      :
              function(url) {
                var _this = this;
                _this.url = url;
                return require('jquery').ajax(
                  {'url'      : _this.url
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
  module.exports = transactions;
});