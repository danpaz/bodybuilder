'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FilterBuilder = function () {
  function FilterBuilder() {
    _classCallCheck(this, FilterBuilder);

    this._filters = {};
  }
  /**
   * Apply a filter of a given type providing all the necessary arguments,
   * passing these arguments directly to the specified filter builder. Merges
   * existing filter(s) with the new filter.
   *
   * @private
   *
   * @param  {String}  type Name of the filter type.
   * @param  {...args} args Arguments passed to filter builder.
   * @returns {FilterBuilder} Builder class.
   */


  _createClass(FilterBuilder, [{
    key: 'filter',
    value: function filter(type) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this._filter.apply(this, ['and', type].concat(args));
      return this;
    }
  }, {
    key: '_filter',
    value: function _filter(boolType, filterType) {
      var klass = _index2.default[filterType];
      var newFilter = void 0;

      if (!klass) {
        throw new TypeError('Filter type ' + filterType + ' not found.');
      }

      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      newFilter = klass.apply(undefined, args);
      this._filters = (0, _utils.boolMerge)(newFilter, this._filters, boolType);
      return this;
    }

    /**
     * Alias to FilterBuilder#filter.
     *
     * @private
     *
     * @returns {FilterBuilder} Builder class.
     */

  }, {
    key: 'andFilter',
    value: function andFilter() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this._filter.apply(this, ['and'].concat(args));
    }
  }, {
    key: 'orFilter',
    value: function orFilter(type) {
      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      this._filter.apply(this, ['or', type].concat(args));
      return this;
    }
  }, {
    key: 'notFilter',
    value: function notFilter(type) {
      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      this._filter.apply(this, ['not', type].concat(args));
      return this;
    }
  }, {
    key: 'filters',
    get: function get() {
      return (0, _cloneDeep2.default)(this._filters);
    }
  }]);

  return FilterBuilder;
}();

exports.default = FilterBuilder;