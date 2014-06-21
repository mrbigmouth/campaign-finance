//require設定
requirejs.config(
  {'baseUrl' : ''
  ,'paths'   :
    {'jquery'     : 'lib/jquery-2.1.1.min'
    ,'bootstrap'  : 'lib/bootstrap'
    ,'underscore' : 'lib/underscore-min'
    ,'backbone'   : 'lib/backbone-min'
    ,'text'       : 'lib/requireText'
    ,'app'        : 'app'
    }
  ,'shim'    :
    {'backbone'   :
        {'deps'    : ['underscore']
        }
    ,'bootstrap'  :
        {'deps'    : ['jquery']
        ,'exports' : '$.fn.affix'
        }
    }
  ,'urlArgs' : "t=" + Date.now()
  }
);

//啟動app
require(
  ['app/app'
  ]
, function(app) {
    app.start();
  }
);