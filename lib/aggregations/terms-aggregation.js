'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign2 = require('lodash/assign');

var _assign3 = _interopRequireDefault(_assign2);

exports.default = termsAggregation;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Terms aggregation.
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_terms_<field>.
 * @param  {Object} opts  Additional options to include in the aggregation.
 * @return {Object}       Terms aggregation.
 */
function termsAggregation(field, name, opts) {
  name = name || 'agg_terms_' + field;
  return _defineProperty({}, name, {
    terms: function () {
      return (0, _assign3.default)({ field: field }, opts);
    }()
  });
}