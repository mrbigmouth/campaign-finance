define(function (require, exports, module) {
  var _      = require('underscore')
    , result =
        new (require('backbone').View.extend(
          {'template'   : _.template(require('text!app/view/result.html'))
          ,'render'     :
              function($area, text) {
                var _this = this;
                _this.$el.html('檢索中...').appendTo( $area );
                require('app/app').load().done(function() {
                  var result = {'text' : text}
                    , data   = require('app/data')
                    , match  = new RegExp(text)
                    ;
                  result.politicians =
                    data.politicians.filter(function(d) {
                      return match.test( d.get('name') );
                    });
                  result.entities = 
                    data.entities.filter(function(d) {
                      return match.test( d.get('name') );
                    });
                  _this.$el.html( _this.template.call(this, result) );
                });
                return this;
              }
          }
        ))();

  //導出
  module.exports = result;
});