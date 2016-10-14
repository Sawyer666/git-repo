  var view = (function () {
      var link = document.getElementById("switcher");
      var main = document.getElementById('main-css');
      var sidebar = document.getElementById('sidebar-css');
      var menu = document.getElementById('menu-css');
      var Contact_Form = document.getElementById('Contact_Form-css');

      var _showLinkText = function (_text) {
          el.innerHTML = _text;
      };

      var _setCss = function (res_obj) {
          link.innerHTML = res_obj.link;
          main.href = res_obj.mainCss;
          menu.href = res_obj.menuCss;
          sidebar.href = res_obj.sidebarCss;
          Contact_Form.href = res_obj.contactForm;
      };

      var _getMainHrefString = function () {
          return main.href;
      }

      return {
          showLinkText: _showLinkText,
          setCss: _setCss,
          getMainHrefString: _getMainHrefString
      }
  })();

  var cookieModel = (function () {
      var _url_main_css = 'http://dou25spb.ru/wp-content/themes/douTheme/css/main.css';
      var _url_main_Eyes_css = 'http://dou25spb.ru/wp-content/themes/douTheme/css/main_Eyes.css';
      var _url_sidebar_css = 'http://dou25spb.ru/wp-content/themes/douTheme/css/sidebar.css';
      var _url_sidebar_Eyes_css = 'http://dou25spb.ru/wp-content/themes/douTheme/css/sidebar_Eyes.css';
      var _url_menu_css = 'http://dou25spb.ru/wp-content/themes/douTheme/css/menu.css';
      var _url_contactForm_css = 'http://dou25spb.ru/wp-content/themes/douTheme/css/Contact-Form.css';

      var _initCookie = function (name, value) {
          var cookie_string = name + "=" + escape(value) + ";";
          document.cookie = cookie_string;
      };

      var _deleteCookie = function (cookie_name) {
          var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
          if (results) {
              var cookie_date = new Date(); // Текущая дата и время
              cookie_date.setTime(cookie_date.getTime() - 1);
              document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
          };
      }

      var _getCookie = function (cookie_name) {
          var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
          if (results)
              return (unescape(results[2]));
          else
              return null;
      };

      var _initStyle = function (_cookie_default, _cookieEyesVersion) {
          var obj_css = {};
          if (_getCookie(_cookie_default) == null && _getCookie(_cookieEyesVersion) == null) {
              obj_css.link = "Версия для слабовидящих";
              obj_css.mainCss = _url_main_css;
              obj_css.menuCss = _url_sidebar_css;
              obj_css.sidebarCss = _url_menu_css;
              obj_css.contactForm = _url_contactForm_css;
          } else if (_getCookie(_cookieEyesVersion) != null) {
              obj_css.link = "Обычная Версия";
              obj_css.mainCss = _url_main_Eyes_css;
              obj_css.menuCss = "";
              obj_css.sidebarCss = _url_sidebar_Eyes_css;
              obj_css.contactForm = "";
          } else if (_getCookie(_cookie_default) != null) {
              obj_css.link = "Версия для слабовидящих";
              obj_css.mainCss = _url_main_css;
              obj_css.menuCss = _url_menu_css;
              obj_css.sidebarCss = _url_sidebar_css;
              obj_css.contactForm = _url_contactForm_css;
          }
          return obj_css;
      }

      var _checkStyle = function (_mainCss) {
          var obj_css = {};
          if (_mainCss == _url_main_css) {
              var res = _getCookie("cookie_css");
              if (res) {
                  _deleteCookie("cookie_css");
              }
              _initCookie("cookieEyes", _url_main_Eyes_css);
              obj_css.link = "Обычная Версия";
              obj_css.mainCss = _url_main_Eyes_css;
              obj_css.menuCss = "";
              obj_css.sidebarCss = "";
              obj_css.contactForm = "";
          } else {
              _deleteCookie("cookieEyes");
              _initCookie("cookie_css", _url_main_css);
              obj_css.link = "Версия для слабовидящих";
              obj_css.mainCss = _url_main_css;
              obj_css.menuCss = _url_menu_css;
              obj_css.sidebarCss = _url_sidebar_css;
              obj_css.contactForm = _url_contactForm_css;
          }
          return obj_css;
      }

      return {
          initStyle: _initStyle,
          checkStyle: _checkStyle
      }
  })();

  var controller = (function () {

      var _loadStyle = function (default_css, eyes_css) {
          var res_obj = cookieModel.initStyle(default_css, eyes_css);
          view.setCss(res_obj);
      };
      var _handleClick = function () {
          // console.time("first");
          var default_css = view.getMainHrefString();
          var res_obj = cookieModel.checkStyle(default_css);
          view.setCss(res_obj);
          //   console.timeEnd("first");
      }
      return {
          handleClick: _handleClick,
          loadStyle: _loadStyle
      }
  })();

  var app = (function () {
      var main = function () {

          //   console.time("first");
          controller.loadStyle("cookie_css", "cookieEyes");
          //   console.timeEnd("first");
      };
      var event = function () {
          link = document.getElementById("switcher");
          link.onclick = controller.handleClick;
      }
      return {
          init: function () {
              main();
              event();
          }
      }
  })();

  app.init();