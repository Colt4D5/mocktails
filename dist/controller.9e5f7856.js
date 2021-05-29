// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/carousel/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.API_URL = exports.API_KEY = void 0;
var API_KEY = '9973533'; // PERSONAL API_KEY FROM PATREON

exports.API_KEY = API_KEY;
var API_URL = "http://www.thecocktaildb.com/api/json/v2/".concat(API_KEY, "/latest.php");
exports.API_URL = API_URL;
},{}],"js/carousel/view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = require("./config.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var View = /*#__PURE__*/function () {
  function View() {
    _classCallCheck(this, View);

    _defineProperty(this, "_parentContainer", document.querySelector('.img-carousel-container'));

    _defineProperty(this, "_data", void 0);

    _defineProperty(this, "_currentImg", 0);

    _defineProperty(this, "_dotContainer", document.querySelector('.img-dots'));

    _defineProperty(this, "_drinkInfo", void 0);
  }

  _createClass(View, [{
    key: "renderResults",
    value: function () {
      var _renderResults = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._data = data; // console.log(this._data);

                _context.next = 3;
                return this.generateMarkup();

              case 3:
                this.handleCarousel();

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function renderResults(_x) {
        return _renderResults.apply(this, arguments);
      }

      return renderResults;
    }()
  }, {
    key: "clearHTML",
    value: function clearHTML() {
      this._parentContainer.innerHTML = '';
    }
  }, {
    key: "generateMarkup",
    value: function generateMarkup() {
      var _this = this;

      this._data.allImgs.map(function (drink, i) {
        var markup = "\n          <div data-drink-id=\"".concat(drink.idDrink, "\" class=\"carousel-title-wrapper\"><h4 class=\"carousel-title\">").concat(drink.strDrink, "</h4></div>\n          <img class=\"img-cocktail\" data-index=\"").concat(i, "\" src=\"").concat(drink.strDrinkThumb, "\" alt=\"").concat(drink.strDrink, " thumbnail\" />\n          ");

        _this.renderHTML(markup);

        _this.insertDot(i);
      });

      this.setActiveDot();
    }
  }, {
    key: "insertDot",
    value: function insertDot(i) {
      var dot = "\n        <div data-index=\"".concat(i, "\" class=\"dot\"></div>\n      ");

      this._dotContainer.insertAdjacentHTML('beforeend', dot);
    }
  }, {
    key: "renderHTML",
    value: function renderHTML(html) {
      this._parentContainer.insertAdjacentHTML('beforeend', html);
    }
  }, {
    key: "handleCarousel",
    value: function handleCarousel() {
      var _this2 = this;

      var imgs = document.querySelectorAll('.img-cocktail');
      var titles = document.querySelectorAll('.carousel-title-wrapper');
      imgs.forEach(function (img, i) {
        img.style.transform = "translateX(".concat(100 * (i - _this2._currentImg), "%)");
      });
      titles.forEach(function (title, i) {
        title.style.transform = "translateX(".concat(-200 * (i - _this2._currentImg), "%)");
      });
    }
  }, {
    key: "handleCarouselClick",
    value: function handleCarouselClick(e) {
      if (e.target.closest('button')) {
        var value = Number(e.target.closest('button').dataset.value);
        if (this._currentImg <= 0 && value === -1 || this._currentImg >= this._data.allImgs.length - 1 && value === 1) return console.log("Can't Do that!");
        this.scrollCarousel(value);
      } else if (e.target.closest('.dot')) {
        var dotIndex = e.target.dataset.index;
        this.scrollCarouselTo(dotIndex);
      } else if (e.target.closest('.carousel-title-wrapper')) {
        var id = e.target.closest('.carousel-title-wrapper').dataset.drinkId; // console.log(id);

        this.toggleModal(id);
      } else {
        return;
      }
    }
  }, {
    key: "scrollCarousel",
    value: function scrollCarousel(value) {
      var _this3 = this;

      this._currentImg += value;
      console.log(this._currentImg);
      var imgs = document.querySelectorAll('.img-cocktail');
      var titles = document.querySelectorAll('.carousel-title-wrapper');
      imgs.forEach(function (img, i) {
        img.style.transform = "translateX(".concat(100 * (i - _this3._currentImg), "%)");
      });
      titles.forEach(function (title, i) {
        title.style.transform = "translateX(".concat(-200 * (i - _this3._currentImg), "%)");
      });
      this.setActiveDot();
    }
  }, {
    key: "scrollCarouselTo",
    value: function scrollCarouselTo(i) {
      var _this4 = this;

      var imgs = document.querySelectorAll('.img-cocktail');
      var titles = document.querySelectorAll('.carousel-title-wrapper');
      this._currentImg = Number(i);
      imgs.forEach(function (img, i) {
        img.style.transform = "translateX(".concat(100 * (i - _this4._currentImg), "%)");
      });
      titles.forEach(function (title, i) {
        title.style.transform = "translateX(".concat(-200 * (i - _this4._currentImg), "%)");
      });
      this.setActiveDot();
    }
  }, {
    key: "setActiveDot",
    value: function setActiveDot() {
      var dots = document.querySelectorAll('.dot');
      var index = Number(this._currentImg);
      dots.forEach(function (dot, i) {
        dot.classList.remove('active');
        if (index === i) dot.classList.add('active');
      });
    } // I know this is not supposed to be in the View... :(

  }, {
    key: "toggleModal",
    value: function () {
      var _toggleModal = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.fetchDrinkInfo(id);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function toggleModal(_x2) {
        return _toggleModal.apply(this, arguments);
      }

      return toggleModal;
    }()
  }, {
    key: "fetchDrinkInfo",
    value: function () {
      var _fetchDrinkInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
        var url, res, _yield$res$json, drinks, data, drink;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                url = "https://www.thecocktaildb.com/api/json/v2/".concat(_config.API_KEY, "/lookup.php?i=");
                _context3.prev = 1;
                console.log("url: ".concat(url).concat(id));
                _context3.next = 5;
                return fetch("".concat(url).concat(id));

              case 5:
                res = _context3.sent;
                _context3.next = 8;
                return res.json();

              case 8:
                _yield$res$json = _context3.sent;
                drinks = _yield$res$json.drinks;
                data = drinks[0];
                drink = {
                  id: id,
                  name: data.strDrink,
                  img: data.strDrinkThumb,
                  instructions: data.strInstructions
                };
                console.log(drink);
                this._drinkInfo = drink;
                this.populateModal();
                _context3.next = 20;
                break;

              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3["catch"](1);
                console.log('Could not find that drink');

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 17]]);
      }));

      function fetchDrinkInfo(_x3) {
        return _fetchDrinkInfo.apply(this, arguments);
      }

      return fetchDrinkInfo;
    }()
  }, {
    key: "populateModal",
    value: function populateModal() {
      document.querySelector('.modal-wrapper').classList.add('active');
      var modal = document.querySelector('.modal');
      var html = "\n    <i class=\"far fa-times-circle\"></i>\n    <h4 class=\"header\">".concat(this._drinkInfo.name, "</h4>\n    <div class=\"img-box\">\n      <img src=\"").concat(this._drinkInfo.img, "\" alt=\"").concat(this._drinkInfo.name, " Thumbnail\">\n    </div>\n    <p class=\"instructions\">").concat(this._drinkInfo.instructions, "</p>");
      modal.insertAdjacentHTML('beforeend', html);
    }
  }, {
    key: "closeModal",
    value: function closeModal(e) {
      if (e.target.classList.contains('overlay') || e.target.closest('.fa-times-circle')) {
        document.querySelector('.modal').innerHTML = '';
        document.querySelector('.modal-wrapper').classList.remove('active');
      }
    }
  }, {
    key: "addEventHandlers",
    value: function addEventHandlers() {
      var _this5 = this;

      var btns = document.querySelectorAll('.page-btn');
      btns.forEach(function (btn) {
        btn.addEventListener('click', _this5.changePage.bind(_this5));
      });
    }
  }]);

  return View;
}();

var _default = new View();

exports.default = _default;
},{"./config.js":"js/carousel/config.js"}],"js/carousel/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Data = /*#__PURE__*/function () {
  function Data() {
    _classCallCheck(this, Data);

    _defineProperty(this, "state", {
      allImgs: null,
      index: 1,
      totalImgs: 1
    });
  }

  _createClass(Data, [{
    key: "loadResults",
    value: function () {
      var _loadResults = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
        var res, _yield$res$json, drinks;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(url);
                _context.prev = 1;
                _context.next = 4;
                return fetch(url);

              case 4:
                res = _context.sent;

                if (res.ok) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", new Error('Oops! Could not find your drinks.'));

              case 7:
                _context.next = 9;
                return res.json();

              case 9:
                _yield$res$json = _context.sent;
                drinks = _yield$res$json.drinks;
                this.state.allImgs = drinks;
                this.state.totalImgs = Math.ceil(this.state.allImgs.length);
                console.log("Total Images: ".concat(this.state.totalImgs));
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](1);
                console.error("Oops! ".concat(_context.t0.message));

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 16]]);
      }));

      function loadResults(_x) {
        return _loadResults.apply(this, arguments);
      }

      return loadResults;
    }() // pagination() {
    //   const trimStart = (this.state.page - 1) * RES_PER_PAGE;
    //   const trimEnd = trimStart + RES_PER_PAGE;
    //   const results = this.state.allData.slice(trimStart, trimEnd);
    //   return results;
    // }
    // changePage(val) {
    //   this.state.page += val;
    //   view.renderProducts(this.getProducts, API_URL);
    // }

  }]);

  return Data;
}();

var _default = new Data();

exports.default = _default;
},{}],"js/carousel/controller.js":[function(require,module,exports) {
"use strict";

var _config = require("./config.js");

var _view = _interopRequireDefault(require("./view.js"));

var _model = _interopRequireDefault(require("./model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// CONTROLLER
document.addEventListener('DOMContentLoaded', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _model.default.loadResults(_config.API_URL);

        case 2:
          _context.next = 4;
          return _view.default.renderResults(_model.default.state);

        case 4:
          // EVENT LISTENERS
          document.querySelector('.img-carousel-container').addEventListener('click', _view.default.handleCarouselClick.bind(_view.default));
          document.querySelector('.modal-wrapper').addEventListener('click', _view.default.closeModal);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
},{"./config.js":"js/carousel/config.js","./view.js":"js/carousel/view.js","./model.js":"js/carousel/model.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63503" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/carousel/controller.js"], null)
//# sourceMappingURL=/controller.9e5f7856.js.map