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

var FiltersBuilder = function () {
  function FiltersBuilder() {
    _classCallCheck(this, FiltersBuilder);

    this._filters = {};
  }
  /**
   * Apply a filter of a given type providing all the necessary arguments,
   * passing these arguments directly to the specified filter builder. Merges
   * existing filter(s) with the new filter.
   *
   * @private
   *
   * @param  {String}  name Name of the filter.
   * @param  {String}  type Name of the filter type.
   * @param  {...args} args Arguments passed to filter builder.
   * @returns {FilterBuilder} Builder class.
   */


  _createClass(FiltersBuilder, [{
    key: 'filter',
    value: function filter(name, type) {
      var klass = _index2.default[type];
      var newFilter = void 0;

      if (!klass) {
        throw new TypeError('Filter type ' + type + ' not found.');
      }

      newFilter = {};

      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      newFilter[name] = klass.apply(undefined, args);

      this._filters = (0, _utils.mergeConcat)({}, newFilter, this._filters);
      return this;
    }
  }, {
    key: 'filters',
    get: function get() {
      return (0, _cloneDeep2.default)(this._filters);
    }
  }]);

  return FiltersBuilder;
}();

exports.default = FiltersBuilder;