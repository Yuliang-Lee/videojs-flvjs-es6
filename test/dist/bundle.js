(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":1}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file plugin.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Html5 = _video2.default.getTech('Html5');
var mergeOptions = _video2.default.mergeOptions || _video2.default.util.mergeOptions;
var defaults = {
  mediaDataSource: {},
  config: {}
};

var Flvjs = function (_Html) {
  _inherits(Flvjs, _Html);

  /**
   * Create an instance of this Tech.
   *
   * @param {Object} [options]
   *        The key/value store of player options.
   *
   * @param {Component~ReadyCallback} ready
   *        Callback function to call when the `Flvjs` Tech is ready.
   */
  function Flvjs(options, ready) {
    _classCallCheck(this, Flvjs);

    options = mergeOptions(defaults, options);
    return _possibleConstructorReturn(this, (Flvjs.__proto__ || Object.getPrototypeOf(Flvjs)).call(this, options, ready));
  }

  /**
   * A getter/setter for the `Flvjs` Tech's source object.
   *
   * @param {Tech~SourceObject} [src]
   *        The source object you want to set on the `Flvjs` techs.
   *
   * @return {Tech~SourceObject|undefined}
   *         - The current source object when a source is not passed in.
   *         - undefined when setting
   */


  _createClass(Flvjs, [{
    key: 'setSrc',
    value: function setSrc(src) {
      if (this.flvPlayer) {
        // Is this necessary to change source?
        this.flvPlayer.detachMediaElement();
        this.flvPlayer.destroy();
      }

      var mediaDataSource = this.options_.mediaDataSource;
      var config = this.options_.config;

      mediaDataSource.type = mediaDataSource.type === undefined ? 'flv' : mediaDataSource.type;
      mediaDataSource.url = src;
      this.flvPlayer = window.flvjs.createPlayer(mediaDataSource, config);
      this.flvPlayer.attachMediaElement(this.el_);
      this.flvPlayer.load();
    }

    /**
     * Dispose of flvjs.
     */

  }, {
    key: 'dispose',
    value: function dispose() {
      if (this.flvPlayer) {
        this.flvPlayer.detachMediaElement();
        this.flvPlayer.destroy();
      }
      _get(Flvjs.prototype.__proto__ || Object.getPrototypeOf(Flvjs.prototype), 'dispose', this).call(this);
    }
  }]);

  return Flvjs;
}(Html5);

/**
 * Check if the Flvjs tech is currently supported.
 *
 * @return {boolean}
 *          - True if the Flvjs tech is supported.
 *          - False otherwise.
 */


Flvjs.isSupported = function () {

  return window.flvjs && window.flvjs.isSupported();
};

/**
 * Flvjs supported mime types.
 *
 * @constant {Object}
 */
Flvjs.formats = {
  'video/flv': 'FLV',
  'video/x-flv': 'FLV'
};

/**
 * Check if the tech can support the given type
 *
 * @param {string} type
 *        The mimetype to check
 * @return {string} 'probably', 'maybe', or '' (empty string)
 */
Flvjs.canPlayType = function (type) {
  if (Flvjs.isSupported() && type in Flvjs.formats) {
    return 'maybe';
  }

  return '';
};

/**
 * Check if the tech can support the given source
 * @param {Object} srcObj
 *        The source object
 * @param {Object} options
 *        The options passed to the tech
 * @return {string} 'probably', 'maybe', or '' (empty string)
 */
Flvjs.canPlaySource = function (srcObj, options) {
  return Flvjs.canPlayType(srcObj.type);
};

// Include the version number.
Flvjs.VERSION = '1.0.0';

_video2.default.registerTech('Flvjs', Flvjs);

exports.default = Flvjs;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _qunit = (typeof window !== "undefined" ? window['QUnit'] : typeof global !== "undefined" ? global['QUnit'] : null);

var _qunit2 = _interopRequireDefault(_qunit);

var _sinon = (typeof window !== "undefined" ? window['sinon'] : typeof global !== "undefined" ? global['sinon'] : null);

var _sinon2 = _interopRequireDefault(_sinon);

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _plugin = require('../src/plugin');

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_qunit2.default.test('the environment is sane', function (assert) {
  assert.strictEqual(_typeof(Array.isArray), 'function', 'es5 exists');
  assert.strictEqual(typeof _sinon2.default === 'undefined' ? 'undefined' : _typeof(_sinon2.default), 'object', 'sinon exists');
  assert.strictEqual(typeof _video2.default === 'undefined' ? 'undefined' : _typeof(_video2.default), 'function', 'videojs exists');
  assert.strictEqual(typeof _plugin2.default === 'undefined' ? 'undefined' : _typeof(_plugin2.default), 'function', 'plugin is a function');
});

_qunit2.default.module('videojs-flvjs', {
  beforeEach: function beforeEach() {

    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5. This MUST come
    // before any player is created; otherwise, timers could get created
    // with the actual timer methods!
    this.clock = _sinon2.default.useFakeTimers();

    this.fixture = _document2.default.getElementById('qunit-fixture');
    this.video = _document2.default.createElement('video');
    this.fixture.appendChild(this.video);
    this.player = (0, _video2.default)(this.video);
  },
  afterEach: function afterEach() {
    this.player.dispose();
    this.clock.restore();
  }
});

_qunit2.default.test('can play flv source', function (assert) {
  assert.expect(2);

  // Fake the presence of flv.js and that it's on a supported browser
  window.flvjs = {};
  window.flvjs.isSupported = function () {
    return true;
  };

  assert.ok(_plugin2.default.canPlaySource({ type: 'video/flv' }, {}), 'video/flv supported');
  assert.ok(_plugin2.default.canPlaySource({ type: 'video/x-flv' }, {}), 'video/x-flv supported');

  delete window.flvjs;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../src/plugin":3,"global/document":2}]},{},[4]);
