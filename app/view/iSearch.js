define(function (require, exports, module) {
  var _      = require('underscore')
    , search =
        new (require('backbone').View.extend(
          {'template'   : _.template(require('text!app/view/search.html'))
          ,'render'     :
              function($area, text) {
                this.$el.html( this.template.call(this) ).appendTo( $area );
                if (text) {
                  this.$('#searchText').val(text);
                }
                return this;
              }
          ,'events'     :
              {'submit'   : 
                  function(e) {
                    e.preventDefault();
                    var text = this.$('#searchText').val();
                    if (text === '') {
                      return false;
                    }
                    require('app/app').go('search/' + encodeURIComponent(text));
                  }
              }
          }
        ))();

  //導出
  module.exports = search;
});