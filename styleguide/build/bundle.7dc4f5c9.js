/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "build/" + ({}[chunkId]||chunkId) + "." + {}[chunkId] + ".js"
/******/ 	}
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./actions/types.js":
/*!**************************!*\
  !*** ./actions/types.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar LOCATION_CHANGE = exports.LOCATION_CHANGE = 'LOCATION_CHANGE';\nvar RECEIVE_COMPONENTS = exports.RECEIVE_COMPONENTS = 'RECEIVE_COMPONENTS';\nvar RECEIVE_ERROR = exports.RECEIVE_ERROR = 'RECEIVE_ERROR';\nvar FINISH_LOADING = exports.FINISH_LOADING = 'FINISH_LOADING';\nvar UPDATE_VISIBILITY = exports.UPDATE_VISIBILITY = 'UPDATE_VISIBILITY';\n\n//# sourceURL=webpack:///./actions/types.js?");

/***/ }),

/***/ "./components/form/inputRadio.js":
/*!***************************************!*\
  !*** ./components/form/inputRadio.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _classnames = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n\nvar _classnames2 = _interopRequireDefault(_classnames);\n\nvar _lib = __webpack_require__(/*! critical-style-loader/lib */ \"./node_modules/critical-style-loader/lib/index.js\");\n\nvar _label = __webpack_require__(/*! ./label */ \"./components/form/label.js\");\n\nvar _label2 = _interopRequireDefault(_label);\n\nvar _radio = __webpack_require__(/*! ./radio.css */ \"./components/form/radio.css\");\n\nvar _radio2 = _interopRequireDefault(_radio);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar InputRadio = function InputRadio(props) {\n  var id = props.id,\n      label = props.label,\n      required = props.required,\n      className = props.className;\n\n\n  return _react2.default.createElement(\n    'div',\n    { className: (0, _classnames2.default)(_radio2.default.inputWrapper, className) },\n    _react2.default.createElement('input', _extends({}, props, { type: 'radio', className: _radio2.default.input })),\n    _react2.default.createElement(_label2.default, { htmlFor: id, text: label, require: required })\n  );\n};\n\nInputRadio.propTypes = {\n  id: _propTypes2.default.string.isRequired,\n  name: _propTypes2.default.string.isRequired,\n  label: _propTypes2.default.string.isRequired,\n  onChange: _propTypes2.default.func.isRequired,\n  value: _propTypes2.default.string.isRequired,\n  checked: _propTypes2.default.bool,\n  required: _propTypes2.default.bool,\n  className: _propTypes2.default.string\n};\n\nInputRadio.defaultProps = {\n  checked: false,\n  required: false,\n  className: ''\n};\n\nexports.default = (0, _lib.withStyles)(_radio2.default)(InputRadio);\n\n//# sourceURL=webpack:///./components/form/inputRadio.js?");

/***/ }),

/***/ "./components/form/label.css":
/*!***********************************!*\
  !*** ./components/form/label.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader??ref--9-1!../../node_modules/postcss-loader/lib??ref--9-2!./label.css */ \"./node_modules/css-loader/index.js??ref--9-1!./node_modules/postcss-loader/lib/index.js??ref--9-2!./components/form/label.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\ntransform = __webpack_require__(/*! ../../node_modules/critical-style-loader/lib/filterCriticalCss.js */ \"./node_modules/critical-style-loader/lib/filterCriticalCss.js\");\n\nvar options = {\"transform\":\"node_modules/critical-style-loader/lib/filterCriticalCss.js\",\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./components/form/label.css?");

/***/ }),

/***/ "./components/form/label.js":
/*!**********************************!*\
  !*** ./components/form/label.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _classnames = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n\nvar _classnames2 = _interopRequireDefault(_classnames);\n\nvar _lib = __webpack_require__(/*! critical-style-loader/lib */ \"./node_modules/critical-style-loader/lib/index.js\");\n\nvar _label = __webpack_require__(/*! ./label.css */ \"./components/form/label.css\");\n\nvar _label2 = _interopRequireDefault(_label);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// This rule is both deprecated and appears to be causing an erroneous warning\n/* eslint-disable jsx-a11y/label-has-for */\nvar Label = function Label(props) {\n  var htmlFor = props.htmlFor,\n      text = props.text,\n      required = props.required,\n      className = props.className;\n\n  return _react2.default.createElement(\n    'label',\n    {\n      className: (0, _classnames2.default)(_label2.default.label, className),\n      htmlFor: htmlFor\n    },\n    text,\n    required && _react2.default.createElement(\n      'span',\n      { className: _label2.default.required },\n      'required'\n    )\n  );\n};\n/* eslint-enable */\n\nLabel.propTypes = {\n  className: _propTypes2.default.string,\n  htmlFor: _propTypes2.default.string.isRequired,\n  text: _propTypes2.default.string.isRequired,\n  required: _propTypes2.default.bool\n};\n\nLabel.defaultProps = {\n  className: '',\n  required: false\n};\n\nexports.default = (0, _lib.withStyles)(_label2.default)(Label);\n\n//# sourceURL=webpack:///./components/form/label.js?");

/***/ }),

/***/ "./components/form/radio.css":
/*!***********************************!*\
  !*** ./components/form/radio.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader??ref--9-1!../../node_modules/postcss-loader/lib??ref--9-2!./radio.css */ \"./node_modules/css-loader/index.js??ref--9-1!./node_modules/postcss-loader/lib/index.js??ref--9-2!./components/form/radio.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\ntransform = __webpack_require__(/*! ../../node_modules/critical-style-loader/lib/filterCriticalCss.js */ \"./node_modules/critical-style-loader/lib/filterCriticalCss.js\");\n\nvar options = {\"transform\":\"node_modules/critical-style-loader/lib/filterCriticalCss.js\",\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./components/form/radio.css?");

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--9-1!./node_modules/postcss-loader/lib/index.js??ref--9-2!./components/form/label.css":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/postcss-loader/lib??ref--9-2!./components/form/label.css ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(true);\n// imports\n\n\n// module\nexports.push([module.i, \".label__label--WqozB {\\n  font-size: 0.75rem;\\n}\\n\\n.label__required--1Rt0f {\\n  color: red;\\n}\\n\", \"\", {\"version\":3,\"sources\":[\"/Users/owen/broadway/www/irving-app/components/form/label.css\"],\"names\":[],\"mappings\":\"AAAA;EACE,mBAAmB;CACpB;;AAED;EACE,WAAW;CACZ\",\"file\":\"label.css\",\"sourcesContent\":[\".label {\\n  font-size: rem(12);\\n}\\n\\n.required {\\n  color: red;\\n}\\n\"],\"sourceRoot\":\"\"}]);\n\n// exports\nexports.locals = {\n\t\"label\": \"label__label--WqozB\",\n\t\"required\": \"label__required--1Rt0f\"\n};\n\n//# sourceURL=webpack:///./components/form/label.css?./node_modules/css-loader??ref--9-1!./node_modules/postcss-loader/lib??ref--9-2");

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--9-1!./node_modules/postcss-loader/lib/index.js??ref--9-2!./components/form/radio.css":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/postcss-loader/lib??ref--9-2!./components/form/radio.css ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(true);\n// imports\n\n\n// module\nexports.push([module.i, \".radio__inputWrapper--ZT5Z5 {\\n  -ms-flex-align: center;\\n      align-items: center;\\n  display: -ms-flexbox;\\n  display: flex;\\n  margin-bottom: 0.625rem;\\n  width: 100%;\\n}\\n\\n.radio__input--2r4TI {\\n  margin-right: 0.625rem;\\n}\\n\", \"\", {\"version\":3,\"sources\":[\"/Users/owen/broadway/www/irving-app/components/form/radio.css\"],\"names\":[],\"mappings\":\"AAAA;EACE,uBAAoB;MAApB,oBAAoB;EACpB,qBAAc;EAAd,cAAc;EACd,wBAAuB;EACvB,YAAY;CACb;;AAED;EACE,uBAAsB;CACvB\",\"file\":\"radio.css\",\"sourcesContent\":[\".inputWrapper {\\n  align-items: center;\\n  display: flex;\\n  margin-bottom: rem(10);\\n  width: 100%;\\n}\\n\\n.input {\\n  margin-right: rem(10);\\n}\\n\"],\"sourceRoot\":\"\"}]);\n\n// exports\nexports.locals = {\n\t\"inputWrapper\": \"radio__inputWrapper--ZT5Z5\",\n\t\"input\": \"radio__input--2r4TI\"\n};\n\n//# sourceURL=webpack:///./components/form/radio.css?./node_modules/css-loader??ref--9-1!./node_modules/postcss-loader/lib??ref--9-2");

/***/ }),

/***/ "./node_modules/react-styleguidist/loaders/examples-loader.js!./components/form/inputRadio.md":
/*!****************************************************************************************************!*\
  !*** ./node_modules/react-styleguidist/loaders/examples-loader.js!./components/form/inputRadio.md ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nif (false) {}\n\nvar requireMap = { 'react': __webpack_require__(/*! react */ \"./node_modules/react/index.js\") };\nvar requireInRuntimeBase = __webpack_require__(/*! ./node_modules/react-styleguidist/loaders/utils/client/requireInRuntime */ \"./node_modules/react-styleguidist/loaders/utils/client/requireInRuntime.js\");\nvar requireInRuntime = requireInRuntimeBase.bind(null, requireMap);\nvar evalInContextBase = __webpack_require__(/*! ./node_modules/react-styleguidist/loaders/utils/client/evalInContext */ \"./node_modules/react-styleguidist/loaders/utils/client/evalInContext.js\");\nvar evalInContext = evalInContextBase.bind(null, \"var React = require('react');\", requireInRuntime);\n\nmodule.exports = [\n    {\n        'type': 'markdown',\n        'content': 'Radio input example:'\n    },\n    {\n        'type': 'code',\n        'content': '<InputRadio \\n    id=\"testRadio\" \\n    name=\"testRadio\" \\n    label=\"This is a sample radio button component\" \\n    onChange={() => {}} \\n    value=\"testRadio\" \\n/>',\n        'settings': {},\n        'evalInContext': evalInContext\n    }\n]\n\t\n\n//# sourceURL=webpack:///./components/form/inputRadio.md?./node_modules/react-styleguidist/loaders/examples-loader.js");

/***/ }),

/***/ "./node_modules/react-styleguidist/loaders/props-loader.js!./components/form/inputRadio.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/react-styleguidist/loaders/props-loader.js!./components/form/inputRadio.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nif (false) {}\n\nmodule.exports = {\n    'description': '',\n    'displayName': 'InputRadio',\n    'methods': [],\n    'props': [\n        {\n            'type': { 'name': 'string' },\n            'required': true,\n            'description': '',\n            'tags': {},\n            'name': 'id'\n        },\n        {\n            'type': { 'name': 'string' },\n            'required': true,\n            'description': '',\n            'tags': {},\n            'name': 'label'\n        },\n        {\n            'type': { 'name': 'string' },\n            'required': true,\n            'description': '',\n            'tags': {},\n            'name': 'name'\n        },\n        {\n            'type': { 'name': 'func' },\n            'required': true,\n            'description': '',\n            'tags': {},\n            'name': 'onChange'\n        },\n        {\n            'type': { 'name': 'string' },\n            'required': true,\n            'description': '',\n            'tags': {},\n            'name': 'value'\n        },\n        {\n            'type': { 'name': 'bool' },\n            'required': false,\n            'description': '',\n            'defaultValue': {\n                'value': 'false',\n                'computed': false\n            },\n            'tags': {},\n            'name': 'checked'\n        },\n        {\n            'type': { 'name': 'string' },\n            'required': false,\n            'description': '',\n            'defaultValue': {\n                'value': '\\'\\'',\n                'computed': false\n            },\n            'tags': {},\n            'name': 'className'\n        },\n        {\n            'type': { 'name': 'bool' },\n            'required': false,\n            'description': '',\n            'defaultValue': {\n                'value': 'false',\n                'computed': false\n            },\n            'tags': {},\n            'name': 'required'\n        }\n    ],\n    'doclets': {},\n    'examples': __webpack_require__(/*! !./node_modules/react-styleguidist/loaders/examples-loader.js!./components/form/inputRadio.md */ \"./node_modules/react-styleguidist/loaders/examples-loader.js!./components/form/inputRadio.md\")\n}\n\t\n\n//# sourceURL=webpack:///./components/form/inputRadio.js?./node_modules/react-styleguidist/loaders/props-loader.js");

/***/ }),

/***/ "./reducers/componentsReducer.js":
/*!***************************************!*\
  !*** ./reducers/componentsReducer.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _set2 = __webpack_require__(/*! lodash/fp/set */ \"./node_modules/lodash/fp/set.js\");\n\nvar _set3 = _interopRequireDefault(_set2);\n\nvar _get2 = __webpack_require__(/*! lodash/fp/get */ \"./node_modules/lodash/fp/get.js\");\n\nvar _get3 = _interopRequireDefault(_get2);\n\nvar _flow2 = __webpack_require__(/*! lodash/fp/flow */ \"./node_modules/lodash/fp/flow.js\");\n\nvar _flow3 = _interopRequireDefault(_flow2);\n\nexports.default = componentReducer;\n\nvar _types = __webpack_require__(/*! ../actions/types */ \"./actions/types.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Handle component related Redux actions.\n * @param {object} state - Redux state\n * @param {{type payload}} action - Redux action\n * @returns {object} - The updated Redux state\n */\nfunction componentReducer(state, action) {\n  var type = action.type,\n      payload = action.payload;\n\n  if (_types.RECEIVE_COMPONENTS !== type) {\n    return state;\n  }\n\n  var currentDefaults = state.components.defaults;\n  var key = (0, _get3.default)('route.redirectTo', state) || (0, _get3.default)('route.pathname', state);\n  var defaults = payload.defaults,\n      page = payload.page;\n\n  return (0, _flow3.default)((0, _set3.default)('components.defaults', defaults.length ? defaults : currentDefaults), (0, _set3.default)('components.page.' + key, page))(state);\n}\n\n//# sourceURL=webpack:///./reducers/componentsReducer.js?");

/***/ }),

/***/ "./reducers/defaultState.js":
/*!**********************************!*\
  !*** ./reducers/defaultState.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar components = exports.components = {\n  defaults: [],\n  page: {}\n};\n\nvar route = exports.route = {\n  status: null,\n  redirectTo: false,\n  action: ''\n};\n\nvar visible = exports.visible = {};\n\nvar error = exports.error = null;\n\nvar loading = exports.loading = false;\n\nvar defaultState = {\n  components: components,\n  route: route,\n  error: error,\n  loading: loading,\n  visible: visible\n};\n\nexports.default = defaultState;\n\n//# sourceURL=webpack:///./reducers/defaultState.js?");

/***/ }),

/***/ "./reducers/errorReducer.js":
/*!**********************************!*\
  !*** ./reducers/errorReducer.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = errorReducer;\n\nvar _types = __webpack_require__(/*! ../actions/types */ \"./actions/types.js\");\n\nvar _defaultState = __webpack_require__(/*! ./defaultState */ \"./reducers/defaultState.js\");\n\n/**\n * Handle Redux actions operating on the error state slice.\n * @param {Error|null} errorState - error state slice\n * @param {{type payload}} action - Redux action\n * @returns {Error|null} - The updated error state\n */\nfunction errorReducer() {\n  var errorState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaultState.error;\n  var action = arguments[1];\n  var type = action.type,\n      payload = action.payload;\n\n  switch (type) {\n    case _types.LOCATION_CHANGE:\n      return _defaultState.error;\n\n    case _types.RECEIVE_ERROR:\n      return payload;\n\n    default:\n      return errorState;\n  }\n}\n\n//# sourceURL=webpack:///./reducers/errorReducer.js?");

/***/ }),

/***/ "./reducers/index.js":
/*!***************************!*\
  !*** ./reducers/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _redux = __webpack_require__(/*! redux */ \"./node_modules/redux/es/index.js\");\n\nvar _reduceReducers = __webpack_require__(/*! reduce-reducers */ \"./node_modules/reduce-reducers/es/index.js\");\n\nvar _reduceReducers2 = _interopRequireDefault(_reduceReducers);\n\nvar _defaultState = __webpack_require__(/*! ./defaultState */ \"./reducers/defaultState.js\");\n\nvar _defaultState2 = _interopRequireDefault(_defaultState);\n\nvar _componentsReducer = __webpack_require__(/*! ./componentsReducer */ \"./reducers/componentsReducer.js\");\n\nvar _componentsReducer2 = _interopRequireDefault(_componentsReducer);\n\nvar _routeReducer = __webpack_require__(/*! ./routeReducer */ \"./reducers/routeReducer.js\");\n\nvar _routeReducer2 = _interopRequireDefault(_routeReducer);\n\nvar _errorReducer = __webpack_require__(/*! ./errorReducer */ \"./reducers/errorReducer.js\");\n\nvar _errorReducer2 = _interopRequireDefault(_errorReducer);\n\nvar _loadingReducer = __webpack_require__(/*! ./loadingReducer */ \"./reducers/loadingReducer.js\");\n\nvar _loadingReducer2 = _interopRequireDefault(_loadingReducer);\n\nvar _visibilityReducer = __webpack_require__(/*! ./visibilityReducer */ \"./reducers/visibilityReducer.js\");\n\nvar _visibilityReducer2 = _interopRequireDefault(_visibilityReducer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Configure \"slice\" reducers.\nvar rootSliceReducer = (0, _redux.combineReducers)({\n  components: function components() {\n    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaultState2.default.components;\n    return state;\n  },\n  route: _routeReducer2.default,\n  error: _errorReducer2.default,\n  loading: _loadingReducer2.default,\n  visible: _visibilityReducer2.default\n});\n\n// \"State\" reducers are composed together. The order they are passed into\n// reduceReducers determines the order they will be run in.\nvar rootReducer = (0, _reduceReducers2.default)(rootSliceReducer, _componentsReducer2.default);\n\nexports.default = rootReducer;\n\n//# sourceURL=webpack:///./reducers/index.js?");

/***/ }),

/***/ "./reducers/loadingReducer.js":
/*!************************************!*\
  !*** ./reducers/loadingReducer.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = loadingReducer;\n\nvar _types = __webpack_require__(/*! ../actions/types */ \"./actions/types.js\");\n\nvar _defaultState = __webpack_require__(/*! ./defaultState */ \"./reducers/defaultState.js\");\n\n/**\n * Handle Redux actions operating on the loading state slice.\n * @param {bool} loadingState - loading state slice\n * @param {{type payload}} action - Redux action\n * @returns {object} - The updated loading state\n */\nfunction loadingReducer() {\n  var loadingState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaultState.error;\n  var action = arguments[1];\n  var type = action.type;\n\n  switch (type) {\n    case _types.LOCATION_CHANGE:\n      return true;\n\n    case _types.FINISH_LOADING:\n    case _types.RECEIVE_COMPONENTS:\n    case _types.RECEIVE_ERROR:\n      return false;\n\n    default:\n      return loadingState;\n  }\n}\n\n//# sourceURL=webpack:///./reducers/loadingReducer.js?");

/***/ }),

/***/ "./reducers/routeReducer.js":
/*!**********************************!*\
  !*** ./reducers/routeReducer.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nexports.default = routeReducer;\n\nvar _types = __webpack_require__(/*! ../actions/types */ \"./actions/types.js\");\n\nvar _defaultState = __webpack_require__(/*! ./defaultState */ \"./reducers/defaultState.js\");\n\n/**\n * Handle Redux actions operating on the route state slice.\n * @param {object} routeState - route state slice\n * @param {{type payload}} action - Redux action\n * @returns {object} - The updated route state\n */\nfunction routeReducer() {\n  var routeState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaultState.route;\n  var action = arguments[1];\n  var type = action.type,\n      payload = action.payload;\n\n  switch (type) {\n    case _types.LOCATION_CHANGE:\n      return _extends({}, routeState, payload, {\n        status: _defaultState.route.status,\n        redirectTo: _defaultState.route.redirectTo\n      });\n\n    case _types.RECEIVE_COMPONENTS:\n      return _extends({}, routeState, {\n        status: payload.status,\n        redirectTo: payload.redirectTo\n      });\n\n    case _types.RECEIVE_ERROR:\n      return _extends({}, routeState, {\n        status: 500\n      });\n\n    default:\n      return routeState;\n  }\n}\n\n//# sourceURL=webpack:///./reducers/routeReducer.js?");

/***/ }),

/***/ "./reducers/visibilityReducer.js":
/*!***************************************!*\
  !*** ./reducers/visibilityReducer.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nexports.default = visibilityReducer;\n\nvar _types = __webpack_require__(/*! ../actions/types */ \"./actions/types.js\");\n\nvar _defaultState = __webpack_require__(/*! ./defaultState */ \"./reducers/defaultState.js\");\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/**\n * Handle Redux actions related to global UI element visibility.\n *\n * @param {object} visibleState - visible state slice\n * @param {{type payload}} action - Redux action\n * @return {object}\n */\nfunction visibilityReducer() {\n  var visibleState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaultState.visible;\n  var action = arguments[1];\n  var type = action.type,\n      payload = action.payload;\n\n  if (_types.UPDATE_VISIBILITY !== type) {\n    return visibleState;\n  }\n\n  var name = payload.name,\n      isVisible = payload.isVisible;\n  // Toggle value if it was omitted in action.\n\n  var newValue = null !== isVisible && 'undefined' !== typeof isVisible ? isVisible : !visibleState[name];\n\n  return _extends({}, visibleState, _defineProperty({}, name, newValue));\n}\n\n//# sourceURL=webpack:///./reducers/visibilityReducer.js?");

/***/ }),

/***/ "./styleguide/components/wrapper.js":
/*!******************************************!*\
  !*** ./styleguide/components/wrapper.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n\nvar _redux = __webpack_require__(/*! redux */ \"./node_modules/redux/es/index.js\");\n\nvar _lib = __webpack_require__(/*! critical-style-loader/lib */ \"./node_modules/critical-style-loader/lib/index.js\");\n\nvar _reducers = __webpack_require__(/*! ../../reducers */ \"./reducers/index.js\");\n\nvar _reducers2 = _interopRequireDefault(_reducers);\n\nvar _defaultState = __webpack_require__(/*! ../../reducers/defaultState */ \"./reducers/defaultState.js\");\n\nvar _defaultState2 = _interopRequireDefault(_defaultState);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar store = (0, _redux.createStore)(_reducers2.default, _extends({}, _defaultState2.default, {\n  components: {\n    defaults: [],\n    page: {\n      '/': [{\n        name: 'body',\n        config: {\n          name: 'body'\n        },\n        children: []\n      }]\n    }\n  },\n  route: {\n    pathname: '/'\n  }\n}));\n// Container for critical css related to this page render.\nvar cssBuilder = new _lib.CriticalCssBuilder();\n\nvar Wrapper = function Wrapper(props) {\n  var children = props.children;\n\n  return _react2.default.createElement(\n    _reactRedux.Provider,\n    { store: store },\n    _react2.default.createElement(\n      _lib.StyleContext.Provider,\n      { value: cssBuilder.addCss },\n      children\n    )\n  );\n};\n\nWrapper.propTypes = {\n  children: _propTypes2.default.object.isRequired\n};\n\nexports.default = Wrapper;\n\n//# sourceURL=webpack:///./styleguide/components/wrapper.js?");

/***/ }),

/***/ 0:
/*!*********************************************************!*\
  !*** multi ./node_modules/react-styleguidist/lib/index ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /Users/owen/broadway/www/irving-app/node_modules/react-styleguidist/lib/index */\"./node_modules/react-styleguidist/lib/index.js\");\n\n\n//# sourceURL=webpack:///multi_./node_modules/react-styleguidist/lib/index?");

/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ }),

/***/ 3:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///buffer_(ignored)?");

/***/ }),

/***/ 4:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///crypto_(ignored)?");

/***/ })

/******/ });