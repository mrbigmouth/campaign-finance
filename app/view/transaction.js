//生成資料表
function makeDataTable($area, data) {
  require(
    ['jquery'
    ,'datatable'
    ]
  , function($) {
      $area.DataTable(
        {'data'       : data
        //初始按照第一個欄位(日期)降冪排列
        ,'order'      : [ [0, 'desc'] ]
        ,'searching'  : false
        ,'pageLength' : 25
        ,'lengthMenu' : [ [25, 50, 100, 200, 500, -1], [25, 50, 100, 200, 500, "全部"]]
        ,'columns'    :
            [ {'data'       : 'date'
              ,'title'      : '交易日期'
              ,'type'       : 'date'
              ,'searchable' : false
              ,'width'      : '100px'
              }
            , {'data'       : 'code'
              ,'title'      : '收支科目'
              ,'type'       : 'string'
              ,'searchable' : false
              ,'width'      : '120px'
              }
            , {'data'       : 'amount'
              ,'title'      : '金額'
              ,'type'       : 'numeric'
              ,'searchable' : false
              ,'width'      : '150px'
              ,'render'     :
                  function(amount, type, row) {
                    amount = $.isNumeric(amount) ? parseInt(amount, 10) : 0;
                    if (type === 'display') {
                      if (row.type === 'payout') {
                        return '支出$' + amount;
                      }
                      else {
                        return '收入$' + amount;
                      }
                    }
                    return amount;
                  }
              }
            , {'data'       : 'donator'
              ,'title'      : '捐贈者/支出對象'
              ,'type'       : 'sting'
              ,'searchable' : true
              ,'width'      : '400px'
              ,'render'     :
                  function(cell, type, row) {
                    if (type === 'display') {
                      return '<a href="#entitie/' + row.donator_id + '">' + row.donator + '</a>';
                    }
                    return amount;
                  }
              }
            ]
        }
      );
      $area.removeClass('display').addClass('table table-striped table-bordered');
    }
  );
}

//生成圓餅圖
function makePie($area, values, labels) {
  require(
    ['lib/raphael-min'
    ,'lib/raphael-pie'
    ]
  , function(raphael) {
      console.log(raphael);
      raphael( $area.get(0), 700, 700).pieChart(350, 350, 200, values, labels, "#fff");
    }
  );
}

define(function (require, exports, module) {
  var _    = require('underscore')
    , list = {}
    , view =
        require('backbone').View.extend(
          {'template'   : _.template(require('text!app/view/transaction.html'))
          ,'render'     :
              function($area) {
                var view       = this
                  , collection = view.collection
                  ;
                view.$el.html('載入中...').appendTo( $area );
                //資料載入完成後
                collection.on('reset', function() {
                  view.$el.html('<table></table><div class="pie"></div>');

                  //生成資料表
                  makeDataTable(
                    view.$('table')
                  , collection.map(function(d) { return d.attributes; })
                  );

                  //生成圓餅圖
                  var pieValue = []
                    , pieLabel = []
                    ;
                  collection.each(function(d) {
                    var data = d.attributes;
                    pieValue.push(data.amount);
                    pieLabel.push(data.donator);
                  });
                  makePie(
                    view.$('div.pie')
                  , pieValue
                  , pieLabel
                  )
                });
                //開始載入資料
                collection.fetch( this.collection.url );
                return this;
              }
          }
        )
    , undefined
    ;

  //導出
  exports.create =
      function($area, id, url) {
        var collection = require('app/collection/transactions')
          , undefined
          ;
        collection = new collection();
        collection.url = url;
        if (list[ url ] === undefined) {
          list[ url ] =
              new view(
                {'el'         : $area[0]
                ,'collection' : collection
                ,'attributes' :
                    {'data-id'  : id
                    }
                ,'className'  : '.transaction.transaction' + id
                }
              ).render($area);
        }
        else {
          list[ url ].render($area);
        }
        return list[ url ];
      }
});