define(function (require, exports, module) {
  var _    = require('underscore')
    , menu = new (require('backbone').View.extend(
    {'template'   : _.template(require('text!app/view/menu.html'))
    ,'collection' : require('app/collection/accounts')
    ,'load'       :
        function() {
          return this.collection.fetch();
        }
    ,'render'     :
        function() {
          this.$el.html( this.template.call(this) ).appendTo('#App');
          return this;
        }
    ,'initialize' :
        function() {
          var _this = this;
          this.collection.on('reset', function() {
            _this.render();
          });
          return this;
        }
    }
  ))();

  //導出
  module.exports = menu;
});