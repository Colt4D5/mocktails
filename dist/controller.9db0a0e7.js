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
})({"js/drinks/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RES_PER_PAGE = exports.API_URL = exports.API_KEY = void 0;
const API_KEY = '9973533'; // PERSONAL API_KEY FROM PATREON
// const API_KEY = '1'; TEST API KEY
// const API_URL = `http://www.thecocktaildb.com/api/json/v1/${API_KEY}/search.php?s=margarita`;

exports.API_KEY = API_KEY;
const API_URL = `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/filter.php?c=`;
exports.API_URL = API_URL;
const RES_PER_PAGE = 6;
exports.RES_PER_PAGE = RES_PER_PAGE;
},{}],"js/drinks/view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = require("./config.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class View {
  constructor() {
    _defineProperty(this, "_parentContainer", document.querySelector('#drinks-container'));

    _defineProperty(this, "_data", void 0);

    _defineProperty(this, "_drinkInfo", void 0);

    _defineProperty(this, "_query", void 0);
  }

  renderResults(data) {
    this._data = data; // console.log(this._data);

    const paginatedResults = this.paginateResults();
    document.querySelector('#search-bar').value = '';
    this.clearHTML();
    this.generateMarkup(paginatedResults);
    this.renderPageBtns();
    this.addEventHandlers();
  }

  paginateResults(data) {
    if (!data) {
      const trimStart = (this._data.page - 1) * _config.RES_PER_PAGE;
      const trimEnd = trimStart + _config.RES_PER_PAGE;

      const results = this._data.allData.slice(trimStart, trimEnd);

      return results;
    } else {
      const trimStart = (this._data.page - 1) * _config.RES_PER_PAGE;
      const trimEnd = trimStart + _config.RES_PER_PAGE;
      const results = data.slice(trimStart, trimEnd);
      return results;
    }
  }

  clearHTML() {
    this._parentContainer.innerHTML = '';
  }

  generateMarkup(results) {
    results.map(drink => {
      const markup = `
        <div class="card card-cocktail" data-id="${drink.idDrink}">
          <img class="img-cocktail" src="${drink.strDrinkThumb}" alt="${drink.strDrink} thumbnail" />
          <h3 class="tab-cocktail">${drink.strDrink}</h2>
        </div>
      `;
      this.renderHTML(markup);
    });
  }

  renderHTML(html) {
    this._parentContainer.insertAdjacentHTML('beforeend', html);
  }

  renderPageBtns() {
    this._data.page = Math.ceil(this._data.page);
    let html; // if on last page of multiple pages

    if (+this._data.totalPages === +this._data.page) {
      html = `
        <button data-turn-page="-1" type="button" class="page-btn"><i class="fas fa-arrow-left"></i> Page ${+this._data.page - 1}</button>
        <span>Page ${this._data.page} of ${this._data.totalPages}</span>
      `;
    } // if on 1st with no others


    if (+this._data.totalPages === 1) {
      html = `
        <span>Page ${this._data.page} of ${this._data.totalPages}</span>
      `;
    } // if on 1st page of multiple pages


    if (+this._data.totalPages > 1 && +this._data.page === 1) {
      html = `
        <span>Page ${this._data.page} of ${this._data.totalPages}</span>
        <button data-turn-page="1" type="button" class="page-btn">Page ${+this._data.page + 1} <i class="fas fa-arrow-right"></i></button>
      `;
    } // has pages before and after


    if (+this._data.totalPages > 1 && +this._data.page > 1 && +this._data.page < +this._data.totalPages) {
      html = `
        <button data-turn-page="-1" type="button" class="page-btn"><i class="fas fa-arrow-left"></i> Page ${+this._data.page - 1}</button>
        <span>Page ${this._data.page} of ${this._data.totalPages}</span>
        <button data-turn-page="1" type="button" class="page-btn">Page ${+this._data.page + 1} <i class="fas fa-arrow-right"></i></button>
      `;
    }

    document.querySelector('.page-btn-container').innerHTML = html;
  }

  changePage(e) {
    const direction = Number(e.target.dataset.turnPage);
    this._data.page += direction;
    this.renderResults(this._data);
  }

  addEventHandlers() {
    const btns = document.querySelectorAll('.page-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', this.changePage.bind(this));
    });
  }

  handleCarouselClick(e) {
    if (e.target.closest('.card-cocktail')) {
      const id = Number(e.target.closest('.card-cocktail').dataset.id);
      this.toggleModal(id);
    } else {
      return;
    }
  } // I know this is not supposed to be in the View... :(


  async toggleModal(id) {
    await this.fetchDrinkInfo(id);
    this.populateModal();
  }

  async fetchDrinkInfo(id) {
    const url = `https://www.thecocktaildb.com/api/json/v2/${_config.API_KEY}/lookup.php?i=`;

    try {
      console.log(`url: ${url}${id}`);
      const res = await fetch(`${url}${id}`);
      const {
        drinks
      } = await res.json();
      const data = drinks[0];
      const drink = {
        id: id,
        name: data.strDrink,
        img: data.strDrinkThumb,
        instructions: data.strInstructions
      };
      console.log(drink);
      this._drinkInfo = drink;
    } catch (e) {
      console.log('Could not find that drink');
    }
  }

  populateModal() {
    document.querySelector('.modal-wrapper').classList.add('active');
    const modal = document.querySelector('.modal');
    const html = `
        <i class="far fa-times-circle"></i>
        <h4 class="header">${this._drinkInfo.name}</h4>
        <div class="img-box">
          <img src="${this._drinkInfo.img}" alt="${this._drinkInfo.name} Thumbnail">
        </div>
        <p class="instructions">${this._drinkInfo.instructions}</p>`;
    modal.insertAdjacentHTML('beforeend', html);
  }

  closeModal(e) {
    if (e.target.classList.contains('overlay') || e.target.closest('.fa-times-circle')) {
      document.querySelector('.modal').innerHTML = '';
      document.querySelector('.modal-wrapper').classList.remove('active');
    }
  }

  searchQuery(e) {
    this._query = e.target.value;
    console.log(this._data);

    const searchItems = this._data.allData.filter(drink => drink.strDrink.toLowerCase().includes(this._query.toLowerCase()));

    this._data.totalPages = Math.ceil(searchItems.length / _config.RES_PER_PAGE);
    this._page = 1;
    const paginatedResults = this.paginateResults(searchItems);
    console.log(paginatedResults);
    this.clearHTML();
    this.generateMarkup(paginatedResults);
    this.renderPageBtns();
    this.addEventHandlers();
  }

}

var _default = new View();

exports.default = _default;
},{"./config.js":"js/drinks/config.js"}],"js/drinks/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = require("./config.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Data {
  constructor() {
    _defineProperty(this, "state", {
      allData: null,
      page: 1,
      totalPages: 1
    });
  }

  async loadResults(url, category) {
    try {
      const res = await fetch(url + category);
      if (!res) return new Error('Oops! Could not find your drinks.');
      const {
        drinks
      } = await res.json();
      this.state.allData = drinks;
      this.state.totalPages = Math.ceil(this.state.allData.length / _config.RES_PER_PAGE);
      console.log(`Total Pages: ${this.state.totalPages}`);
    } catch (e) {
      console.error(`Oops! ${e.message}`);
    }
  }

  pagination() {
    const trimStart = (this.state.page - 1) * _config.RES_PER_PAGE;
    const trimEnd = trimStart + _config.RES_PER_PAGE;
    const results = this.state.allData.slice(trimStart, trimEnd);
    return results;
  } // changePage(val) {
  //   this.state.page += val;
  //   view.renderProducts(this.getProducts, API_URL);
  // }


}

var _default = new Data();

exports.default = _default;
},{"./config.js":"js/drinks/config.js"}],"js/drinks/controller.js":[function(require,module,exports) {
"use strict";

var _config = require("./config.js");

var _view = _interopRequireDefault(require("./view.js"));

var _model = _interopRequireDefault(require("./model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const testCategory = 'Coffee / Tea';
// CONTROLLER
document.addEventListener('DOMContentLoaded', async () => {
  // GET INITIAL PRODUCTS
  const category = document.querySelector('#category-selector').value;
  await _model.default.loadResults(_config.API_URL, category);
  await _view.default.renderResults(_model.default.state); // EVENT LISTENERS

  document.querySelector('#category-selector').addEventListener('change', async e => {
    const selection = e.target.value;
    await _model.default.loadResults(_config.API_URL, selection);
    _model.default.state.page = 1; // switch(selection) {
    // 	case 'Cocktail':
    // 		document.querySelector('.drink-wrapper').style.backgroundColor = 'palegreen';
    // 		break;
    // 	case 'Ordinary Drink':
    // 		document.querySelector('.drink-wrapper').style.backgroundColor = 'paleTurquoise';
    // 		break;
    // 	case 'Milk / Float / Shake':
    // 		document.querySelector('.drink-wrapper').style.backgroundColor = 'lightpink';
    // 		break;
    // }

    await _view.default.renderResults(_model.default.state);
  });
  document.querySelector('#drinks-container').addEventListener('click', _view.default.handleCarouselClick.bind(_view.default));
  document.querySelector('.modal-wrapper').addEventListener('click', _view.default.closeModal);
  document.querySelector('#search-bar').addEventListener('input', _view.default.searchQuery.bind(_view.default));
});
},{"./config.js":"js/drinks/config.js","./view.js":"js/drinks/view.js","./model.js":"js/drinks/model.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52871" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/drinks/controller.js"], null)
//# sourceMappingURL=/controller.9db0a0e7.js.map