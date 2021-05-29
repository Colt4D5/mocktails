parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"GWDQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.RES_PER_PAGE=exports.API_URL=exports.API_KEY=void 0;var e="9973533";exports.API_KEY=e;var t="http://www.thecocktaildb.com/api/json/v2/".concat(e,"/filter.php?c=");exports.API_URL=t;var o=6;exports.RES_PER_PAGE=o;
},{}],"Am0I":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=require("./config.js");function a(t,a,e,n,r,o,i){try{var c=t[o](i),s=c.value}catch(u){return void e(u)}c.done?a(s):Promise.resolve(s).then(n,r)}function e(t){return function(){var e=this,n=arguments;return new Promise(function(r,o){var i=t.apply(e,n);function c(t){a(i,r,o,c,s,"next",t)}function s(t){a(i,r,o,c,s,"throw",t)}c(void 0)})}}function n(t,a){if(!(t instanceof a))throw new TypeError("Cannot call a class as a function")}function r(t,a){for(var e=0;e<a.length;e++){var n=a[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function o(t,a,e){return a&&r(t.prototype,a),e&&r(t,e),t}function i(t,a,e){return a in t?Object.defineProperty(t,a,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[a]=e,t}var c=function(){function a(){n(this,a),i(this,"_parentContainer",document.querySelector("#drinks-container")),i(this,"_data",void 0),i(this,"_drinkInfo",void 0)}return o(a,[{key:"renderResults",value:function(t){this._data=t;var a=this.paginateResults(this._data);this.clearHTML(),this.generateMarkup(a),this.renderPageBtns(),this.addEventHandlers()}},{key:"paginateResults",value:function(a){var e=(a.page-1)*t.RES_PER_PAGE,n=e+t.RES_PER_PAGE;return a.allData.slice(e,n)}},{key:"clearHTML",value:function(){this._parentContainer.innerHTML=""}},{key:"generateMarkup",value:function(t){var a=this;t.map(function(t){var e='\n        <div class="card card-cocktail" data-id="'.concat(t.idDrink,'">\n          <img class="img-cocktail" src="').concat(t.strDrinkThumb,'" alt="').concat(t.strDrink,' thumbnail" />\n          <h3 class="tab-cocktail">').concat(t.strDrink,"</h2>\n        </div>\n      ");a.renderHTML(e)})}},{key:"renderHTML",value:function(t){this._parentContainer.insertAdjacentHTML("beforeend",t)}},{key:"renderPageBtns",value:function(){var t;1==+this._data.totalPages&&(t="\n        <span>Page ".concat(this._data.page," of ").concat(this._data.totalPages,"</span>\n      ")),+this._data.totalPages>1&&1==+this._data.page&&(t="\n        <span>Page ".concat(this._data.page," of ").concat(this._data.totalPages,'</span>\n        <button data-turn-page="1" type="button" class="page-btn">Page ').concat(+this._data.page+1," ></button>\n      ")),+this._data.totalPages>1&&+this._data.page>1&&+this._data.page<+this._data.totalPages&&(t='\n        <button data-turn-page="-1" type="button" class="page-btn">< Page '.concat(+this._data.page-1,"</button>\n        <span>Page ").concat(this._data.page," of ").concat(this._data.totalPages,'</span>\n        <button data-turn-page="1" type="button" class="page-btn">Page ').concat(+this._data.page+1," ></button>\n      ")),+this._data.totalPages==+this._data.page&&(t='\n        <button data-turn-page="-1" type="button" class="page-btn">< Page '.concat(+this._data.page-1,"</button>\n        <span>Page ").concat(this._data.page," of ").concat(this._data.totalPages,"</span>\n      ")),document.querySelector(".page-btn-container").innerHTML=t}},{key:"changePage",value:function(t){var a=Number(t.target.dataset.turnPage);this._data.page+=a,this.renderResults(this._data)}},{key:"addEventHandlers",value:function(){var t=this;document.querySelectorAll(".page-btn").forEach(function(a){a.addEventListener("click",t.changePage.bind(t))})}},{key:"handleCarouselClick",value:function(t){if(t.target.closest(".card-cocktail")){var a=Number(t.target.closest(".card-cocktail").dataset.id);this.toggleModal(a)}}},{key:"toggleModal",value:function(){var t=e(regeneratorRuntime.mark(function t(a){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.fetchDrinkInfo(a);case 2:this.populateModal();case 3:case"end":return t.stop()}},t,this)}));return function(a){return t.apply(this,arguments)}}()},{key:"fetchDrinkInfo",value:function(){var a=e(regeneratorRuntime.mark(function a(e){var n,r,o,i,c,s;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return n="https://www.thecocktaildb.com/api/json/v2/".concat(t.API_KEY,"/lookup.php?i="),a.prev=1,console.log("url: ".concat(n).concat(e)),a.next=5,fetch("".concat(n).concat(e));case 5:return r=a.sent,a.next=8,r.json();case 8:o=a.sent,i=o.drinks,c=i[0],s={id:e,name:c.strDrink,img:c.strDrinkThumb,instructions:c.strInstructions},console.log(s),this._drinkInfo=s,a.next=19;break;case 16:a.prev=16,a.t0=a.catch(1),console.log("Could not find that drink");case 19:case"end":return a.stop()}},a,this,[[1,16]])}));return function(t){return a.apply(this,arguments)}}()},{key:"populateModal",value:function(){document.querySelector(".modal-wrapper").classList.add("active");var t=document.querySelector(".modal"),a='\n        <i class="far fa-times-circle"></i>\n        <h4 class="header">'.concat(this._drinkInfo.name,'</h4>\n        <div class="img-box">\n          <img src="').concat(this._drinkInfo.img,'" alt="').concat(this._drinkInfo.name,' Thumbnail">\n        </div>\n        <p class="instructions">').concat(this._drinkInfo.instructions,"</p>");t.insertAdjacentHTML("beforeend",a)}},{key:"closeModal",value:function(t){(t.target.classList.contains("overlay")||t.target.closest(".fa-times-circle"))&&(document.querySelector(".modal").innerHTML="",document.querySelector(".modal-wrapper").classList.remove("active"))}}]),a}(),s=new c;exports.default=s;
},{"./config.js":"GWDQ"}],"IrdV":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./config.js");function t(e,t,n,r,a,o,i){try{var s=e[o](i),u=s.value}catch(c){return void n(c)}s.done?t(u):Promise.resolve(u).then(r,a)}function n(e){return function(){var n=this,r=arguments;return new Promise(function(a,o){var i=e.apply(n,r);function s(e){t(i,a,o,s,u,"next",e)}function u(e){t(i,a,o,s,u,"throw",e)}s(void 0)})}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=function(){function t(){r(this,t),i(this,"state",{allData:null,page:1,totalPages:1})}return o(t,[{key:"loadResults",value:function(){var t=n(regeneratorRuntime.mark(function t(n,r){var a,o,i;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch(n+r);case 3:if(a=t.sent){t.next=6;break}return t.abrupt("return",new Error("Oops! Could not find your drinks."));case 6:return t.next=8,a.json();case 8:o=t.sent,i=o.drinks,this.state.allData=i,this.state.totalPages=Math.ceil(this.state.allData.length/e.RES_PER_PAGE),console.log("Total Pages: ".concat(this.state.totalPages)),t.next=18;break;case 15:t.prev=15,t.t0=t.catch(0),console.error("Oops! ".concat(t.t0.message));case 18:case"end":return t.stop()}},t,this,[[0,15]])}));return function(e,n){return t.apply(this,arguments)}}()},{key:"pagination",value:function(){var t=(this.state.page-1)*e.RES_PER_PAGE,n=t+e.RES_PER_PAGE;return this.state.allData.slice(t,n)}}]),t}(),u=new s;exports.default=u;
},{"./config.js":"GWDQ"}],"kkEb":[function(require,module,exports) {
"use strict";var e=require("./config.js"),t=n(require("./view.js")),r=n(require("./model.js"));function n(e){return e&&e.__esModule?e:{default:e}}function u(e,t,r,n,u,a,o){try{var c=e[a](o),s=c.value}catch(d){return void r(d)}c.done?t(s):Promise.resolve(s).then(n,u)}function a(e){return function(){var t=this,r=arguments;return new Promise(function(n,a){var o=e.apply(t,r);function c(e){u(o,n,a,c,s,"next",e)}function s(e){u(o,n,a,c,s,"throw",e)}c(void 0)})}}document.addEventListener("DOMContentLoaded",a(regeneratorRuntime.mark(function n(){var u;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return u=document.querySelector("#category-selector").value,n.next=3,r.default.loadResults(e.API_URL,u);case 3:return n.next=5,t.default.renderResults(r.default.state);case 5:document.querySelector("#category-selector").addEventListener("change",function(){var n=a(regeneratorRuntime.mark(function n(u){var a;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return a=u.target.value,n.next=3,r.default.loadResults(e.API_URL,a);case 3:return r.default.state.page=1,n.next=6,t.default.renderResults(r.default.state);case 6:case"end":return n.stop()}},n)}));return function(e){return n.apply(this,arguments)}}()),document.querySelector("#drinks-container").addEventListener("click",t.default.handleCarouselClick.bind(t.default)),document.querySelector(".modal-wrapper").addEventListener("click",t.default.closeModal);case 8:case"end":return n.stop()}},n)})));
},{"./config.js":"GWDQ","./view.js":"Am0I","./model.js":"IrdV"}]},{},["kkEb"], null)
//# sourceMappingURL=/controller.04d98069.js.map