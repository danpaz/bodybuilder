"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nestedAggregation;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Nested aggregation.
 *
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-nested-aggregation.html|ES docs}
 *
 * @memberof Aggregations
 *
 * @param  {String} path   Path of the nested documents.
 * @param  {String} [name] Aggregation name. Defaults to agg_nested_<path>.
 * @return {Object}        Nested aggregation.
 */
function nestedAggregation(path, name) {

  name = name || "agg_nested_" + path;

  return _defineProperty({}, name, {
    nested: { path: path }
  });
}