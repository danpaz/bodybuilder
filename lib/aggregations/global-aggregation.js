'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = globalAggregation;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Global aggregation.
 *
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-global-aggregation.html|ES docs}
 *
 * @memberof Aggregations
 *
 * @param  {String} [name] Aggregation name. Defaults to agg_global.
 * @return {Object}        Global aggregation.
 */
function globalAggregation(name) {

  name = name || 'agg_global';

  return _defineProperty({}, name, {
    global: {}
  });
}