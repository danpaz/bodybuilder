'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

exports.default = reverseNestedAggregation;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Reverse nested aggregation.
 *
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-reverse-nested-aggregation.html|ES docs}
 *
 * @memberof Aggregations
 *
 * @param  {String} [name] Aggregation name. Defaults to agg_reverse_nested.
 * @param  {Object} opts   Additional options to include in the aggregation.
 * @return {Object}        Reverse nested aggregation.
 */
function reverseNestedAggregation(name, opts) {
  if ((0, _isObject2.default)(name)) {
    var _ref = [opts, name];
    name = _ref[0];
    opts = _ref[1];
  }

  name = name || 'agg_reverse_nested';

  return _defineProperty({}, name, {
    reverse_nested: (0, _assign2.default)({}, opts)
  });
}