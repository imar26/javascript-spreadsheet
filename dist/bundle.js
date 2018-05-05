/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Variables declared for the buttons on the index page
var addRow = exports.addRow = document.getElementById('addRow');
var addCol = exports.addCol = document.getElementById("addCol");
var delRow = exports.delRow = document.getElementById("delRow");
var delCol = exports.delCol = document.getElementById("delCol");

var calSum = exports.calSum = document.getElementById("calSum");
var calDiff = exports.calDiff = document.getElementById("calDiff");
var calMul = exports.calMul = document.getElementById("calMul");
var calDiv = exports.calDiv = document.getElementById("calDiv");
var calMod = exports.calMod = document.getElementById("calMod");

var exportToCSV = exports.exportToCSV = document.getElementById("exportTableToCSV");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(1);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "src/images/percent-hover.svg";

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "src/images/percent.svg";

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "src/images/divide-hover.svg";

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "src/images/divide.svg";

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "src/images/multiply-hover.svg";

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "src/images/multiply.svg";

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "src/images/download-hover.svg";

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "src/images/download.svg";

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "src/images/minus-hover.svg";

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "src/images/minus.svg";

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "src/images/plus-hover.svg";

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "src/images/plus.svg";

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url;
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
    }

    return url;
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(16);
exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "body{margin:0;font-family:Alegreya Sans,sans-serif;font-weight:400;font-size:16px;line-height:24px;background-color:#fbfbfb}header{padding:20px 25px;background-color:#fc335c}header p{font-weight:600;font-size:24px;line-height:32px}footer p,header p{font-family:Oswald,sans-serif;margin:0}footer p{text-align:center;color:#fc335c;background-color:#000;padding:15px;font-size:16px;line-height:22px;font-weight:500}.mainContent{padding:30px 0;box-sizing:border-box}.container{width:1280px;margin:0 auto}table{border-collapse:collapse;width:100%}table,td,th{border:1px solid}td:first-child{font-weight:700;text-align:center;padding:0 5px}input[type=text]{border:0;background-color:#fbfbfb;width:100%;padding:5px 10px;box-sizing:border-box}#rowscols input[type=text]{border:1px solid #000;width:auto;margin-right:30px}input:focus{outline:0}#table{margin-bottom:20px}input[type=button],input[type=submit]{border:0;background-color:#fc335c;padding:12px 20px;margin-right:15px;font-size:14px;line-height:20px;cursor:pointer;font-weight:500}input[type=button]:hover,input[type=submit]:hover{background-color:#000;color:#fc335c}input[type=submit]{margin-top:15px;padding:5px 20px}#exportTableToCSV{margin-bottom:20px;float:right;margin-right:0}input.styleBtn{background-repeat:no-repeat;background-position:8px 6px;border:none;cursor:pointer;padding-left:50px;vertical-align:middle}input.addBtn{background-image:url(" + escape(__webpack_require__(14)) + ")}input.addBtn:hover{background-image:url(" + escape(__webpack_require__(13)) + ")}input.minBtn{background-image:url(" + escape(__webpack_require__(12)) + ")}input.minBtn:hover{background-image:url(" + escape(__webpack_require__(11)) + ")}input.dwBtn{background-image:url(" + escape(__webpack_require__(10)) + ")}input.dwBtn:hover{background-image:url(" + escape(__webpack_require__(9)) + ")}input.mulBtn{background-image:url(" + escape(__webpack_require__(8)) + ")}input.mulBtn:hover{background-image:url(" + escape(__webpack_require__(7)) + ")}input.divBtn{background-image:url(" + escape(__webpack_require__(6)) + ")}input.divBtn:hover{background-image:url(" + escape(__webpack_require__(5)) + ")}input.perBtn{background-image:url(" + escape(__webpack_require__(4)) + ")}input.perBtn:hover{background-image:url(" + escape(__webpack_require__(3)) + ")}.highlight{border:1px solid}.selected input{background-color:#afffdf;color:#fc335c}.formula input{background-color:#000;color:#fff}.highlight input{background-color:#fc335c;color:#fff}", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(17);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(18);

var _domLoader = __webpack_require__(0);

// Importing css
var isMouseDown, isHighlighted;
// Declaring number of rows and cols to be displayed on page load

// Importing from different js file
var defrows = 8,
    defcolumns = 5;
// Function to be called on page load 
var init = function init(event) {

    loadTable(event);
    // Calculate height
    var windowHeight = window.innerHeight;
    var headerHeight = document.getElementById('header').clientHeight;
    var footerHeight = document.getElementById('footer').clientHeight;
    // Append total height to the window screen
    var totalHeight = windowHeight - headerHeight - footerHeight;
    document.getElementById("mainContent").setAttribute('style', 'min-height: ' + totalHeight + 'px');
};

window.onload = function (event) {
    init(event);
};
// Loads the Default Table on Page Load
var loadTable = function loadTable(event) {
    var tablearea = document.getElementById('table');
    var table = document.createElement('table');
    // Assign id to table
    table.setAttribute("id", "tableId");
    var tbody = document.createElement('tbody');
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Load for rows
    for (var i = 0; i <= defrows; i++) {
        var tr = document.createElement('tr');
        // Assign id to row
        tr.setAttribute("id", "tr_" + i);
        if (i > 0) {
            // Load for columns
            for (var j = 0; j <= defcolumns; j++) {
                var td = document.createElement('td');

                // td.addEventListener('mousedown', function () {
                //     if (event.isTrusted) {
                //         isMouseDown = true;
                //         td.classList.toggle("selected");
                //         isHighlighted = td.classList.contains("selected");
                //         if(td.classList.contains("formula") || td.classList.contains("highlight")) {
                //             td.classList.remove("selected");
                //         }
                //         return false;
                //     }
                // });

                // td.addEventListener('mouseover', function () {
                //     if (event.isTrusted) {
                //         if (isMouseDown) {
                //             td.classList.toggle("selected", isHighlighted);
                //         }
                //     }
                // });

                eventHandlersTd(td, event);
                if (j > 0) {
                    // Makes all the cells except the first cell as an input
                    var x = document.createElement("INPUT");
                    x.setAttribute("type", "text");
                    td.appendChild(x);
                    // Assign id to cell
                    td.setAttribute("id", str.charAt(j - 1) + i);
                } else {
                    // Adds numbers in the first column of each row
                    var _x = document.createTextNode(i);
                    td.appendChild(_x);
                }
                tr.appendChild(td);
            }
        } else {
            for (var _j = 0; _j <= defcolumns; _j++) {
                var th = document.createElement('th');
                if (_j > 0) {
                    // Adds alphabets as the name of the columns
                    var _x2 = document.createTextNode(str.charAt(_j - 1));
                    th.appendChild(_x2);
                } else {
                    // First column of first row is made empty
                    var _x3 = document.createTextNode("");
                    th.appendChild(_x3);
                }
                tr.appendChild(th);
            }
        }
        tbody.appendChild(tr);
        table.appendChild(tbody);
    }
    tablearea.appendChild(table);
};

// Buttons used on the index page
_domLoader.addRow.addEventListener('click', insertRow);
_domLoader.addCol.addEventListener('click', insertColumn);
_domLoader.delRow.addEventListener('click', removeRow);
_domLoader.delCol.addEventListener('click', removeCol);

_domLoader.calSum.addEventListener('click', calculateSum);
_domLoader.calDiff.addEventListener('click', calculateDifference);
_domLoader.calMul.addEventListener('click', calculateMultiplication);
_domLoader.calDiv.addEventListener('click', calculateDivision);
_domLoader.calMod.addEventListener('click', calculateModulus);

_domLoader.exportToCSV.addEventListener('click', exportTableToCSV);

document.onmouseup = myMouseUpHandler;

function myMouseUpHandler() {
    isMouseDown = false;
}

var eventHandlersTd = function eventHandlersTd(td, event) {
    //Double Click to select Cells to Delete
    td.addEventListener('dblclick', function (event) {
        if (event.isTrusted) {
            // td.classList.remove("selected");
            td.classList.toggle("highlight");
            // if(td.classList.contains("formula")) {
            //     td.classList.remove("highlight");
            // };
        }
    });
    //On Change of Event To Check for Arithmatic Operations
    td.addEventListener('change', function (event) {
        if (event.isTrusted) {
            // For Addition
            if (td.querySelector('input').value.toLowerCase().indexOf("=sum") == 0) {
                // Sets the formula as Data Attribute
                td.dataset.formula = td.querySelector('input').value;
                td.classList.remove("selected");
                td.classList.remove("highlight");
                td.classList.add("formula");
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(td.querySelector('input').value);
                if (matches) {
                    // Adds range in the array
                    var array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findSum(td.id, array[0], array[1]);
                    }
                }
            }
            // For Difference
            if (td.querySelector('input').value.toLowerCase().indexOf("=diff") == 0) {
                // Sets the formula as Data Attribute
                td.dataset.formula = td.querySelector('input').value;
                td.classList.remove("selected");
                td.classList.remove("highlight");
                td.classList.add("formula");
                var _regExp = /\(([^)]+)\)/;
                var _matches = _regExp.exec(td.querySelector('input').value);
                if (_matches) {
                    // Adds range in the array
                    var _array = _matches[1].toUpperCase().split(',');
                    if (_array.length == 2) {
                        findDiff(td.id, _array[0], _array[1]);
                    }
                }
            }
            // For Multiplication
            if (td.querySelector('input').value.toLowerCase().indexOf("=mul") == 0) {
                // Sets the formula as Data Attribute
                td.dataset.formula = td.querySelector('input').value;
                td.classList.remove("selected");
                td.classList.remove("highlight");
                td.classList.add("formula");
                var _regExp2 = /\(([^)]+)\)/;
                var _matches2 = _regExp2.exec(td.querySelector('input').value);
                if (_matches2) {
                    // Adds range in the array
                    var _array2 = _matches2[1].toUpperCase().split(',');
                    if (_array2.length == 2) {
                        findMul(td.id, _array2[0], _array2[1]);
                    }
                }
            }
            // For Division
            if (td.querySelector('input').value.toLowerCase().indexOf("=div") == 0) {
                // Sets the formula as Data Attribute
                td.dataset.formula = td.querySelector('input').value;
                td.classList.remove("selected");
                td.classList.remove("highlight");
                td.classList.add("formula");
                var _regExp3 = /\(([^)]+)\)/;
                var _matches3 = _regExp3.exec(td.querySelector('input').value);
                if (_matches3) {
                    // Adds range in the array
                    var _array3 = _matches3[1].toUpperCase().split(',');
                    if (_array3.length == 2) {
                        findDiv(td.id, _array3[0], _array3[1]);
                    }
                }
            }
            // For Modulus
            if (td.querySelector('input').value.toLowerCase().indexOf("=mod") == 0) {
                // Sets the formula as Data Attribute
                td.dataset.formula = td.querySelector('input').value;
                td.classList.remove("selected");
                td.classList.remove("highlight");
                td.classList.add("formula");
                var _regExp4 = /\(([^)]+)\)/;
                var _matches4 = _regExp4.exec(td.querySelector('input').value);
                if (_matches4) {
                    // Adds range in the array
                    var _array4 = _matches4[1].toUpperCase().split(',');
                    if (_array4.length == 2) {
                        findMod(td.id, _array4[0], _array4[1]);
                    }
                }
            }
            // This function is called when cells are updated
            updateOperation();
        }
    });
};

var updateOperation = function updateOperation() {
    //To check if Any Update is made to any other cells
    var formulacells = document.getElementsByClassName("formula");
    for (var i = 0; i < formulacells.length; i++) {
        var dataId = formulacells[i].id;
        // Gets the data attribute
        var dataFormula = formulacells[i].dataset.formula;
        // For Addition
        if (dataFormula.toLowerCase().indexOf("=sum") == 0) {
            var regExp = /\(([^)]+)\)/;
            var matches = regExp.exec(dataFormula);
            if (matches) {
                // Adds range in the array
                var array = matches[1].toUpperCase().split(',');
                if (array.length == 2) {
                    findSum(dataId, array[0], array[1]);
                }
            }
        }
        // For Difference
        if (dataFormula.toLowerCase().indexOf("=diff") == 0) {
            var _regExp5 = /\(([^)]+)\)/;
            var _matches5 = _regExp5.exec(dataFormula);
            if (_matches5) {
                // Adds range in the array
                var _array5 = _matches5[1].toUpperCase().split(',');
                if (_array5.length == 2) {
                    findDiff(dataId, _array5[0], _array5[1]);
                }
            }
        }
        // For Multiplication
        if (dataFormula.toLowerCase().indexOf("=mul") == 0) {
            var _regExp6 = /\(([^)]+)\)/;
            var _matches6 = _regExp6.exec(dataFormula);
            if (_matches6) {
                // Adds range in the array
                var _array6 = _matches6[1].toUpperCase().split(',');
                if (_array6.length == 2) {
                    findMul(dataId, _array6[0], _array6[1]);
                }
            }
        }
        // For Division
        if (dataFormula.toLowerCase().indexOf("=div") == 0) {
            var _regExp7 = /\(([^)]+)\)/;
            var _matches7 = _regExp7.exec(dataFormula);
            if (_matches7) {
                // Adds range in the array
                var _array7 = _matches7[1].toUpperCase().split(',');
                if (_array7.length == 2) {
                    findDiv(dataId, _array7[0], _array7[1]);
                }
            }
        }
        // For Modulus
        if (dataFormula.toLowerCase().indexOf("=mod") == 0) {
            var _regExp8 = /\(([^)]+)\)/;
            var _matches8 = _regExp8.exec(dataFormula);
            if (_matches8) {
                // Adds range in the array
                var _array8 = _matches8[1].toUpperCase().split(',');
                if (_array8.length == 2) {
                    findMod(dataId, _array8[0], _array8[1]);
                }
            }
        }
    }
};
//Calculates the Sum 
var findSum = function findSum(id, x, y) {
    if (x && y) {
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var firstNumber = void 0;
        var lastNumber = void 0;
        // Row id of first parameter in the range
        var fnumber = document.getElementById(x).parentNode.id.split("_");
        // Row id of second parameter in the range
        var lnumber = document.getElementById(y).parentNode.id.split("_");
        // First letter of the first parameter of the range
        var firstLetter = document.getElementById(x).id;
        // First letter of the second parameter of the range
        var lastLetter = document.getElementById(y).id;
        var tablearea = document.getElementById('tableId');
        var rowNumber1 = void 0,
            rowNumber2 = void 0;
        var regex = /[+-]?\d+(?:\.\d+)?/g;
        var match1 = regex.exec(firstLetter);
        // Starting range while calculating for columns
        rowNumber1 = match1[0];
        regex.lastIndex = 0;
        var match2 = regex.exec(lastLetter);
        // Ending range while calculating for columns
        rowNumber2 = match2[0];
        // Check when the operation is for rows
        if (fnumber[1] == lnumber[1]) {
            var cellsarea = tablearea.rows[fnumber[1]].cells;
            for (var i = 0; i < str.length; i++) {
                // Get number equivalent of the letter which is the name of the column
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }
            // Login to calculate sum
            var sum = 0;
            for (var _i = firstNumber; _i <= lastNumber; _i++) {
                var val1 = cellsarea[_i].querySelector('input').value;
                // Only accept positive, negative and float numbers, else the value will be made 0
                if (val1 == "" || !val1.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                    val1 = 0;
                }
                sum += parseFloat(val1);
            }
            document.getElementById(id).querySelector('input').value = sum;
            // Check when the operation is for columns
        } else if (firstLetter[0] == lastLetter[0]) {
            var colNumber = void 0;
            for (var _i2 = 0; _i2 < str.length; _i2++) {
                // Get number value as the position of the letter in the column
                if (str[_i2] == firstLetter[0]) {
                    colNumber = _i2 + 1;
                }
            }
            // Login to calculate sum
            var _sum = 0;
            for (var j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                if (colNumber > 0) {
                    var val2 = tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value;
                    // Only accept positive, negative and float numbers, else the value will be made 0
                    if (val2 == "" || !val2.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                        val2 = 0;
                    }
                    _sum += parseFloat(val2);
                }
            }
            document.getElementById(id).querySelector('input').value = _sum;
        }
    }
};
//Calculates the Difference
var findDiff = function findDiff(id, x, y) {
    if (x && y) {
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var firstNumber = void 0;
        var lastNumber = void 0;
        // Row id of first parameter in the range
        var fnumber = document.getElementById(x).parentNode.id.split("_");
        // Row id of second parameter in the range
        var lnumber = document.getElementById(y).parentNode.id.split("_");
        // First letter of the first parameter of the range
        var firstLetter = document.getElementById(x).id;
        // First letter of the second parameter of the range
        var lastLetter = document.getElementById(y).id;
        var tablearea = document.getElementById('tableId');
        var rowNumber1 = void 0,
            rowNumber2 = void 0;
        var regex = /[+-]?\d+(?:\.\d+)?/g;
        var match1 = regex.exec(firstLetter);
        // Starting range while calculating for columns
        rowNumber1 = match1[0];
        regex.lastIndex = 0;
        var match2 = regex.exec(lastLetter);
        // Ending range while calculating for columns
        rowNumber2 = match2[0];
        // Check when the operation is for rows
        if (fnumber[1] == lnumber[1]) {
            var cellsarea = tablearea.rows[fnumber[1]].cells;
            for (var i = 0; i < str.length; i++) {
                // Get number equivalent of the letter which is the name of the column
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }
            // Login to calculate difference
            var diff = void 0;
            var value_1 = 0;
            for (var _i3 = firstNumber; _i3 <= lastNumber; _i3++) {
                var cellsVal1 = cellsarea[firstNumber].querySelector('input').value;
                // Only accept positive, negative and float numbers, else the value will be made 0
                if (cellsVal1 == "" || !cellsVal1.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                    cellsVal1 = 0;
                }
                value_1 = parseFloat(cellsVal1);
                var val1 = cellsarea[_i3].querySelector('input').value;
                if (_i3 > firstNumber) {
                    // Only accept positive, negative and float numbers, else the value will be made 0
                    if (val1 == "" || !val1.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                        val1 = 0;
                    }
                    diff -= parseFloat(val1);
                    value_1 = diff;
                }
                diff = value_1;
            }
            document.getElementById(id).querySelector('input').value = diff;
            // Check when the operation is for columns
        } else if (firstLetter[0] == lastLetter[0]) {
            var colNumber = void 0;
            for (var _i4 = 0; _i4 < str.length; _i4++) {
                // Get number value as the position of the letter in the column
                if (str[_i4] == firstLetter[0]) {
                    colNumber = _i4 + 1;
                }
            }
            // Login to calculate difference
            var _diff = void 0;
            var _value_ = 0;
            for (var j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                if (colNumber > 0) {
                    var cellsVal2 = tablearea.rows[parseInt(rowNumber1)].querySelectorAll('td')[colNumber].querySelector('input').value;
                    // Only accept positive, negative and float numbers, else the value will be made 0
                    if (cellsVal2 == "" || !cellsVal2.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                        cellsVal2 = 0;
                    }
                    _value_ = parseFloat(cellsVal2);
                    var val2 = tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value;
                    if (j > parseInt(rowNumber1)) {
                        // Only accept positive, negative and float numbers, else the value will be made 0
                        if (val2 == "" || !val2.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                            val2 = 0;
                        }
                        _diff -= parseFloat(val2);
                        _value_ = _diff;
                    }
                    _diff = _value_;
                }
            }
            document.getElementById(id).querySelector('input').value = _diff;
        }
    }
};
//Calculates the Multiplication
var findMul = function findMul(id, x, y) {
    if (x && y) {
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var firstNumber = void 0;
        var lastNumber = void 0;
        // Row id of first parameter in the range
        var fnumber = document.getElementById(x).parentNode.id.split("_");
        // Row id of second parameter in the range
        var lnumber = document.getElementById(y).parentNode.id.split("_");
        // First letter of the first parameter of the range
        var firstLetter = document.getElementById(x).id;
        // First letter of the second parameter of the range
        var lastLetter = document.getElementById(y).id;
        var tablearea = document.getElementById('tableId');
        var rowNumber1 = void 0,
            rowNumber2 = void 0;
        var regex = /[+-]?\d+(?:\.\d+)?/g;
        var match1 = regex.exec(firstLetter);
        // Starting range while calculating for columns
        rowNumber1 = match1[0];
        regex.lastIndex = 0;
        var match2 = regex.exec(lastLetter);
        // Ending range while calculating for columns
        rowNumber2 = match2[0];
        // Check when the operation is for rows
        if (fnumber[1] == lnumber[1]) {
            var cellsarea = tablearea.rows[fnumber[1]].cells;
            for (var i = 0; i < str.length; i++) {
                // Get number equivalent of the letter which is the name of the column
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }
            // Login to calculate multiplication
            var total = void 0;
            var value_1 = 0;
            for (var _i5 = firstNumber; _i5 <= lastNumber; _i5++) {
                var cellsVal1 = cellsarea[firstNumber].querySelector('input').value;
                // Only accept positive, negative and float numbers, else the value will be made 0
                if (cellsVal1 == "" || !cellsVal1.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                    cellsVal1 = 0;
                }
                value_1 = parseFloat(cellsVal1);
                if (_i5 > firstNumber) {
                    var val1 = cellsarea[_i5].querySelector('input').value;
                    // Only accept positive, negative and float numbers, else the value will be made 0
                    if (val1 == "" || !val1.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                        val1 = 0;
                    }
                    total *= parseFloat(val1);
                    value_1 = total;
                }
                total = value_1;
            }
            document.getElementById(id).querySelector('input').value = total;
            // Check when the operation is for columns
        } else if (firstLetter[0] == lastLetter[0]) {
            var colNumber = void 0;
            for (var _i6 = 0; _i6 < str.length; _i6++) {
                // Get number value as the position of the letter in the column
                if (str[_i6] == firstLetter[0]) {
                    colNumber = _i6 + 1;
                }
            }
            // Login to calculate multiplication
            var _total = void 0;
            var _value_2 = 0;
            for (var j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                var cellsVal2 = tablearea.rows[parseInt(rowNumber1)].querySelectorAll('td')[colNumber].querySelector('input').value;
                // Only accept positive, negative and float numbers, else the value will be made 0
                if (cellsVal2 == "" || !cellsVal2.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                    cellsVal2 = 0;
                }
                if (colNumber > 0) {
                    _value_2 = parseFloat(cellsVal2);
                    var val2 = tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value;
                    // Only accept positive, negative and float numbers, else the value will be made 0
                    if (val2 == "" || !val2.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                        val2 = 0;
                    }
                    if (j > parseInt(rowNumber1)) {

                        _total *= parseFloat(val2);
                        _value_2 = _total;
                    }
                    _total = _value_2;
                }
            }
            document.getElementById(id).querySelector('input').value = _total;
        }
    }
};
//Calculates the Division
var findDiv = function findDiv(id, x, y) {
    if (x && y) {
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var firstNumber = void 0;
        var lastNumber = void 0;
        // Row id of first parameter in the range
        var fnumber = document.getElementById(x).parentNode.id.split("_");
        // Row id of second parameter in the range
        var lnumber = document.getElementById(y).parentNode.id.split("_");
        // First letter of the first parameter of the range
        var firstLetter = document.getElementById(x).id;
        // First letter of the second parameter of the range
        var lastLetter = document.getElementById(y).id;
        var tablearea = document.getElementById('tableId');
        var rowNumber1 = void 0,
            rowNumber2 = void 0;
        var regex = /[+-]?\d+(?:\.\d+)?/g;
        var match1 = regex.exec(firstLetter);
        // Starting range while calculating for columns
        rowNumber1 = match1[0];
        regex.lastIndex = 0;
        var match2 = regex.exec(lastLetter);
        // Ending range while calculating for columns
        rowNumber2 = match2[0];
        // Check when the operation is for rows
        if (fnumber[1] == lnumber[1]) {
            var cellsarea = tablearea.rows[fnumber[1]].cells;
            for (var i = 0; i < str.length; i++) {
                // Get number equivalent of the letter which is the name of the column
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }
            // Login to calculate division
            var total = 0;
            var value_1 = 0;

            for (var _i7 = firstNumber; _i7 <= lastNumber; _i7++) {
                var cellsVal1 = cellsarea[firstNumber].querySelector('input').value;
                // Only accept positive, negative and float numbers, else the value will be made 0
                if (cellsVal1 == "" || !cellsVal1.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                    cellsVal1 = 0;
                }
                value_1 = parseFloat(cellsVal1);
                if (_i7 > firstNumber) {
                    var val1 = cellsarea[_i7].querySelector('input').value;
                    // Only accept positive, negative and float numbers, else the value will be made 0
                    if (val1 == "" || !val1.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                        val1 = 0;
                    }
                    total /= parseFloat(val1);
                    value_1 = total;
                }
                total = value_1;
                if (isNaN(total)) {
                    total = 0;
                }
            }
            document.getElementById(id).querySelector('input').value = total;
            // Check when the operation is for columns
        } else if (firstLetter[0] == lastLetter[0]) {
            var colNumber = void 0;
            for (var _i8 = 0; _i8 < str.length; _i8++) {
                // Get number value as the position of the letter in the column
                if (str[_i8] == firstLetter[0]) {
                    colNumber = _i8 + 1;
                }
            }
            // Login to calculate division
            var _total2 = 0;
            var _value_3 = 0;
            for (var j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                if (colNumber > 0) {
                    var cellsVal2 = tablearea.rows[parseInt(rowNumber1)].querySelectorAll('td')[colNumber].querySelector('input').value;
                    // Only accept positive, negative and float numbers, else the value will be made 0
                    if (cellsVal2 == "" || !cellsVal2.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                        cellsVal2 = 0;
                    }
                    _value_3 = parseFloat(cellsVal2);
                    if (j > parseInt(rowNumber1)) {
                        var val2 = tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value;
                        // Only accept positive, negative and float numbers, else the value will be made 0
                        if (val2 == "" || !val2.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                            val2 = 0;
                        }
                        _total2 /= parseFloat(val2);
                        _value_3 = _total2;
                    }
                    _total2 = _value_3;
                }
                if (isNaN(_total2)) {
                    _total2 = 0;
                }
            }
            document.getElementById(id).querySelector('input').value = _total2;
        }
    }
};
//Calculates the Modulus
var findMod = function findMod(id, x, y) {
    if (x && y) {
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var firstNumber = void 0;
        var lastNumber = void 0;
        // Row id of first parameter in the range
        var fnumber = document.getElementById(x).parentNode.id.split("_");
        // Row id of second parameter in the range
        var lnumber = document.getElementById(y).parentNode.id.split("_");
        // First letter of the first parameter of the range
        var firstLetter = document.getElementById(x).id;
        // First letter of the second parameter of the range
        var lastLetter = document.getElementById(y).id;
        var tablearea = document.getElementById('tableId');
        var rowNumber1 = void 0,
            rowNumber2 = void 0;
        var regex = /[+-]?\d+(?:\.\d+)?/g;
        var match1 = regex.exec(firstLetter);
        rowNumber1 = match1[0];
        // Starting range while calculating for columns
        regex.lastIndex = 0;
        var match2 = regex.exec(lastLetter);
        // Ending range while calculating for columns
        rowNumber2 = match2[0];
        // Check when the operation is for rows
        if (fnumber[1] == lnumber[1]) {
            var cellsarea = tablearea.rows[fnumber[1]].cells;
            for (var i = 0; i < str.length; i++) {
                // Get number equivalent of the letter which is the name of the column
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }
            // Login to calculate modulus
            var total = 0;
            var value_1 = 0;
            for (var _i9 = firstNumber; _i9 <= lastNumber; _i9++) {
                var cellsVal1 = cellsarea[firstNumber].querySelector('input').value;
                // Only accept positive, negative and float numbers, else the value will be made 0
                if (cellsVal1 == "" || !cellsVal1.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                    cellsVal1 = 0;
                }
                value_1 = parseFloat(cellsVal1);
                if (_i9 > firstNumber) {
                    var val1 = cellsarea[_i9].querySelector('input').value;
                    // Only accept positive, negative and float numbers, else the value will be made 0
                    if (val1 == "" || !val1.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                        val1 = 0;
                    }
                    total %= parseFloat(val1);
                    value_1 = total;
                }
                total = value_1;
                if (isNaN(total)) {
                    total = 0;
                }
            }
            document.getElementById(id).querySelector('input').value = total;
            // Check when the operation is for columns
        } else if (firstLetter[0] == lastLetter[0]) {
            var colNumber = void 0;
            for (var _i10 = 0; _i10 < str.length; _i10++) {
                // Get number value as the position of the letter in the column
                if (str[_i10] == firstLetter[0]) {
                    colNumber = _i10 + 1;
                }
            }
            // Login to calculate modulus
            var _total3 = 0;
            var _value_4 = 0;
            for (var j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                if (colNumber > 0) {
                    var cellsVal2 = tablearea.rows[parseInt(rowNumber1)].querySelectorAll('td')[colNumber].querySelector('input').value;
                    // Only accept positive, negative and float numbers, else the value will be made 0
                    if (cellsVal2 == "" || !cellsVal2.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                        cellsVal2 = 0;
                    }
                    _value_4 = parseFloat(cellsVal2);
                    if (j > parseInt(rowNumber1)) {
                        var val2 = tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value;
                        // Only accept positive, negative and float numbers, else the value will be made 0
                        if (val2 == "" || !val2.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                            val2 = 0;
                        }
                        _total3 %= parseFloat(val2);
                        _value_4 = _total3;
                    }
                    _total3 = _value_4;
                }
                if (isNaN(_total3)) {
                    _total3 = 0;
                }
            }
            document.getElementById(id).querySelector('input').value = _total3;
        }
    }
};
//Function to Insert a Column
function insertColumn(event) {
    if (event.isTrusted) {
        var tablearea = document.getElementById('table');
        var tr = document.getElementsByTagName('tr');
        var length = tr.length;
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        // Login to insert column in each row
        for (var i = 0; i < length; i++) {
            if (i > 0) {
                var td = tr[i].insertCell();

                // td.addEventListener('mousedown', function () {
                //     if (event.isTrusted) {
                //         isMouseDown = true;
                //         td.classList.toggle("selected");
                //         isHighlighted = td.classList.contains("selected");
                //         if(td.classList.contains("formula") || td.classList.contains("highlight")) {
                //             td.classList.remove("selected");
                //         }
                //         return false;
                //     }
                // });

                // td.addEventListener('mouseover', function () {
                //     if (event.isTrusted) {
                //         if (isMouseDown) {
                //             td.classList.toggle("selected", isHighlighted);
                //         }
                //     }
                // });

                eventHandlersTd(td);
                // Make cell as an input element
                var x = document.createElement("INPUT");
                x.setAttribute("type", "text");
                td.appendChild(x);
                // Assign id to cell
                td.setAttribute("id", str.charAt(tr[0].cells.length - 2) + i);
            } else {
                var th = document.createElement("th");
                // Columns in first row will be assigned by a letter
                var _x4 = document.createTextNode(str.charAt(tr[0].cells.length - 1));
                th.appendChild(_x4);
                tr[i].appendChild(th);
            }
        }
    }
}
//Function to Insert Row
function insertRow(event) {
    if (event.isTrusted) {
        var table = document.getElementById('tableId');
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        // Assign id to row
        row.setAttribute("id", "tr_" + rowCount);
        // Add cells in each newly added row
        for (var i = 0; i < table.rows[0].cells.length; i++) {
            createCell(row.insertCell(i), i, rowCount);
        }
    }
}
//Insert the cells
function createCell(cell, count, rowCount) {
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // If its not the first column, make cell as an input type
    if (count > 0) {
        var x = document.createElement("INPUT");
        x.setAttribute("type", "text");
        cell.appendChild(x);
        // Assign id to each cell
        cell.setAttribute("id", str.charAt(count - 1) + rowCount);
    } else {
        // If first cell of the row, assign the number as the position of the row
        var _x5 = document.createTextNode(rowCount);
        cell.appendChild(_x5);
    }

    // cell.addEventListener('mousedown', function () {
    //     if (event.isTrusted) {
    //         isMouseDown = true;
    //         cell.classList.toggle("selected");
    //         isHighlighted = cell.classList.contains("selected");
    //         if(td.classList.contains("formula") || td.classList.contains("highlight")) {
    //             td.classList.remove("selected");
    //         }
    //         return false;
    //     }
    // });

    // cell.addEventListener('mouseover', function () {
    //     if (event.isTrusted) {
    //         if (isMouseDown) {
    //             cell.classList.toggle("selected", isHighlighted);
    //         }
    //     }
    // });

    eventHandlersTd(cell);
}
//Deletes the Row and Updates the Table with Headers and Cells Ids
function removeRow(event) {
    if (event.isTrusted) {
        var table = document.getElementById('tableId');
        var selectedCells = document.getElementsByClassName("highlight");
        // Check if the row is selected
        if (selectedCells.length > 0) {
            var r = selectedCells[0].parentNode.id;
            // Get the row id
            var s = r.split("_");
            table.deleteRow(s[1]);

            var l = parseInt(s[1]);
            // Update the text of the first cell of each row
            for (var i = l + 1; i <= table.rows.length; i++) {
                //console.log("Rows length"+ table.rows.length);
                var rw = document.getElementById("tr_" + i);
                rw.setAttribute("id", "tr_" + (i - 1));
                //for(let j = 0; j <= table.rows.length; j++){
                var cells = rw.getElementsByTagName("td");
                cells[0].innerText = i - 1;
                //defrows--;
                //console.log(cells[1].id);
                // Update the id of each cells
                for (var j = 1; j < cells.length; j++) {
                    var ind = cells[j].id;
                    // console.log(ind);
                    var alpha = ind.split("");
                    var regex = /[+-]?\d+(?:\.\d+)?/g;

                    var match = regex.exec(ind);

                    var new_id = alpha[0] + (match[0] - 1);

                    cells[j].setAttribute("id", new_id);
                }
            }
            // This function is called when cells are updated
            updateOperation();
            // If row not selected
        } else {
            document.getElementById("result").style.display = "block";
            document.getElementById("result").style.color = "red";
            document.getElementById("result").innerHTML = "Please select the cell first";
            setTimeout(function () {
                document.getElementById("result").style.display = "none";
            }, 3500);
        }
    }
}
//Deletes the Columns and Updates the Headers and Cell Ids
function removeCol(event) {
    if (event.isTrusted) {
        var table = document.getElementById('tableId');
        var selectedCells = document.getElementsByClassName("highlight");
        // Check if column is selected
        if (selectedCells.length > 0) {
            var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var col = selectedCells[0].id;
            var colInd = col.split("");
            var ind = str.indexOf(colInd[0]);
            var rowsDom = document.getElementsByTagName("tr");
            // Delete the particular column position from all the rows
            for (var i = 0; i < table.rows.length; i++) {
                rowsDom[i].deleteCell(ind + 1);
                if (i > 0) {
                    var colDom = rowsDom[i].getElementsByTagName("td");
                    // Assign id to all the cells
                    for (var m = ind + 1; m < colDom.length; m++) {
                        var indexCol = colDom[m].id;
                        var alpha = indexCol.split("");
                        var regex = /[+-]?\d+(?:\.\d+)?/g;
                        var match = regex.exec(indexCol);
                        regex.leftIndex = 0;
                        var new_id = str[m - 1] + match[0];
                        colDom[m].setAttribute("id", new_id);
                    }
                }
            }
            // Reassign the letter as the name to the header of the table
            var head = document.getElementsByTagName("th");
            for (var j = ind + 1; j < head.length; j++) {
                head[j].innerText = str[j - 1];
            }
            // This function is called when cells are updated            
            updateOperation();
            // If column not selected 
        } else {
            document.getElementById("result").style.display = "block";
            document.getElementById("result").style.color = "red";
            document.getElementById("result").innerHTML = "Please select the cell first";
            setTimeout(function () {
                document.getElementById("result").style.display = "none";
            }, 3500);
        }
    }
}
//Additional Sum Function Implemented
function calculateSum(event) {
    if (event.isTrusted) {
        var selectedCells = document.getElementsByClassName("selected");
        var length = selectedCells.length;
        var sum = 0;
        for (var i = 0; i < length; i++) {
            sum += parseFloat(selectedCells[i].querySelector('input').value);
        }
        document.getElementById("result").innerHTML = "The calculted sum is : " + sum;
    }
}
//Additional Difference Function Implemented
function calculateDifference(event) {
    if (event.isTrusted) {
        var selectedCells = document.getElementsByClassName("selected");
        var length = selectedCells.length;
        var diff = void 0;
        var value_1 = 0;
        for (var i = 0; i < length; i++) {
            value_1 = parseFloat(selectedCells[0].querySelector('input').value);
            if (i > 0) {
                diff -= parseFloat(selectedCells[i].querySelector('input').value);
                value_1 = diff;
            }
            diff = value_1;
        }
        document.getElementById("result").innerHTML = "The calculted difference is : " + diff;
    }
}
//Additional Multiplication Function Implemented
function calculateMultiplication(event) {
    if (event.isTrusted) {
        var selectedCells = document.getElementsByClassName("selected");
        var length = selectedCells.length;
        var total = void 0;
        var value_1 = 0;
        for (var i = 0; i < length; i++) {
            value_1 = parseFloat(selectedCells[0].querySelector('input').value);
            if (i > 0) {
                total *= parseFloat(selectedCells[i].querySelector('input').value);
                value_1 = total;
            }
            total = value_1;
        }
        document.getElementById("result").innerHTML = "The calculted multiplcation is : " + total;
    }
}
//Additional Division Function Implemented
function calculateDivision(event) {
    if (event.isTrusted) {
        var selectedCells = document.getElementsByClassName("selected");
        var length = selectedCells.length;
        var total = void 0;
        var value_1 = 0;
        for (var i = 0; i < length; i++) {
            value_1 = parseFloat(selectedCells[0].querySelector('input').value);
            if (i > 0) {
                total /= parseFloat(selectedCells[i].querySelector('input').value);
                value_1 = total;
            }
            total = value_1;
        }
        document.getElementById("result").innerHTML = "The calculted division is : " + total;
    }
}
//Additional Modulus Function Implemented
function calculateModulus(event) {
    if (event.isTrusted) {
        var selectedCells = document.getElementsByClassName("selected");
        var length = selectedCells.length;
        var total = void 0;
        var value_1 = 0;
        for (var i = 0; i < length; i++) {
            value_1 = parseFloat(selectedCells[0].querySelector('input').value);
            if (i > 0) {
                total %= parseFloat(selectedCells[i].querySelector('input').value);
                value_1 = total;
            }
            total = value_1;
        }
        document.getElementById("result").innerHTML = "The calculted modulus is : " + total;
    }
}
//Export to CSV Functions
function downloadCSV(csv, filename) {
    var csvFile = void 0;
    var downloadLink = void 0;

    // CSV file
    csvFile = new Blob([csv], {
        type: "text/csv"
    });
    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(csvFile, filename);
    } else {

        // Download link
        downloadLink = document.createElement("a");

        // File name
        downloadLink.download = filename;

        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);

        // Hide download link
        downloadLink.style.display = "none";

        // Add the link to DOM
        document.body.appendChild(downloadLink);

        // Click download link
        downloadLink.click();
    }
}
//Export CSV Main Function
function exportTableToCSV(event) {
    if (event.isTrusted) {
        var filename = 'spreadsheet.csv';
        var csv = [];
        var rows = document.querySelectorAll("table tr");

        for (var i = 0; i < rows.length; i++) {
            var row = [];
            if (i > 0) {
                var cols = rows[i].querySelectorAll("td");
                for (var j = 0; j <= cols.length; j++) {
                    if (j > 0) {
                        cols = rows[i].querySelectorAll("td input");
                        row.push(cols[j - 1].value);
                    } else {
                        row.push(cols[j].innerText);
                    }
                }
            } else {
                var _cols = rows[i].querySelectorAll("th");
                for (var _j2 = 0; _j2 < _cols.length; _j2++) {
                    row.push(_cols[_j2].innerText);
                }
            }
            csv.push(row.join(","));
        }

        // Download CSV file
        downloadCSV(csv.join("\n"), filename);
    }
}

/***/ })
/******/ ]);