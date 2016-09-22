'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

exports.default = topHitsAggregation;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Internal counter for added top hits aggregations.
 *
 * @private
 *
 * @type {Number}
 */
var count = 0;

/**
 * Construct a Top hits aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} [name] Aggregation name. Defaults to 'agg_top_hits_{count}'.
 * @param  {Object} opts   Options to include in the aggregation.
 * @return {Object}        Top hits Aggregation.
 */
function topHitsAggregation(name, opts) {
  if ((0, _isObject2.default)(name)) {
    var tmp = opts;
    opts = name;
    name = tmp;
  }

  name = name || 'agg_top_hits_' + count++;

  return _defineProperty({}, name, {
    top_hits: function () {
      return (0, _assign2.default)({}, opts);
    }()
  });
}