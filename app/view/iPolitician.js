define(function (require, exports, module) {
  var _          = require('underscore')
    , politician =
        new (require('backbone').View.extend(
          {'template'   : _.template(require('text!app/view/politician.html'))
          ,'render'     :
              function($area, id) {
                var _this = this;
                _this.$el.html('載入中...').appendTo( $area );

                require('app/app').load().done(function() {
                  var politician  = require('app/data').politicians.get(id)
                    , transaction = require('app/view/transaction')
                    ;
                  _this.$el.html( _this.template.call(this, politician.attributes) );
                  _.each(politician.get('accounts'), function(a) {
                    transaction.create( _this.$('.showTransaction'), a.id, a.transactions_url );
                  });
                });
                return this;
              }
          }
        ))();

  //導出
  module.exports = politician;
});