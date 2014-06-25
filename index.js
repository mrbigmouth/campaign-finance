//require設定
requirejs.config(
  {'baseUrl' : ''
  ,'paths'   :
    {'jquery'        : 'lib/jquery.min'
    ,'bootstrap'     : 'lib/bootstrap'
    ,'underscore'    : 'lib/underscore-min'
    ,'backbone'      : 'lib/backbone-min'
    ,'text'          : 'lib/requireText'
    ,'datatables'    : 'lib/dataTable.min'
    ,'datatable'     : 'lib/dataTable-bootstrap'
    }
  ,'shim'    :
    {'backbone'      :
        {'deps'        : ['underscore']
        }
    ,'bootstrap'     :
        {'deps'        : ['jquery']
        }
    ,'datatable'     :
        {'deps'        : ['datatables', 'bootstrap']
        }
    }
  ,'urlArgs' : "t=" + Date.now()
  }
);

//ajax讀取中時顯示載入圖?
/*
require(
  ['jquery'
  ,'bootstrap'
  ]
, function($) {
    $(document).ajaxStart(function() {
      $('#loading').modal('show');
    });
    $(document).ajaxStop(function() {
      $('#loading').modal('hide');
    });
  }
);
*/

//啟動app
require(
  ['app/app'
  ]
, function(app) {
    app.start();
  }
);