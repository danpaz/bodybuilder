'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clone = require('lodash\\clone');

var _clone2 = _interopRequireDefault(_clone);

var _findKey = require('lodash\\findKey');

var _findKey2 = _interopRequireDefault(_findKey);

var _assign = require('lodash\\assign');

var _assign2 = _interopRequireDefault(_assign);

var _initial = require('lodash\\initial');

var _initial2 = _interopRequireDefault(_initial);

var _isFunction = require('lodash\\isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _last = require('lodash\\last');

var _last2 = _interopRequireDefault(_last);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var AggregationBuilder = {
  /**
   * Apply a aggregation of a given type providing all the necessary arguments,
   * passing these arguments directly to the specified aggregation builder.
   * Merges existing aggregation(s) with the new aggregation.
   *
   * @param  {String}  type Name of the aggregation type.
   * @param  {...args} args Arguments passed to aggregation builder. May include
   *                        a nest function as the last item.
   * @returns {AggregationBuilder} Builder object.
   */
  aggregation: function aggregation(type) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var klass = _index2.default[type];
    var aggregation = Object.create(AggregationBuilder);

    if (!klass) {
      throw new TypeError('Aggregation type ' + type + ' not found.');
    }

    // If last argument is a nesting function, remove it
    // from `args` before building the aggregation
    var nest = (0, _last2.default)(args);
    args = (0, _isFunction2.default)(nest) ? (0, _initial2.default)(args) : args;

    // Mixin to assign newly built aggregation properties
    // to the `AggregationBuilder`
    (0, _assign2.default)(aggregation, klass.apply(undefined, _toConsumableArray(args)));

    // Extend the current aggregation object with the
    // recently built aggregation
    this._aggs = (0, _assign2.default)(this._aggs, aggregation);

    if ((0, _isFunction2.default)(nest)) {
      // Resolve the nested aggregation and set it as a
      // child of the current aggregation
      this._aggs[(0, _findKey2.default)(aggregation)].aggs = nest(aggregation)._aggs;
    }
    return this;
  },


  /**
   * Alias for `aggregation`.
   *
   * @param {...[Object]} args Arguments for `aggregation`.
   * @returns {AggregationBuilder} Builder object.
   */
  add: function add() {
    return this.aggregation.apply(this, arguments);
  },


  /**
   * Get the built aggregation object at its current state.
   * @return {Object} A shallow copy of the internal object describing
   *                    the aggregations built by this builder so far.
   */
  get aggregations() {
    return (0, _clone2.default)(this._aggs);
  }
};

exports.default = AggregationBuilder;