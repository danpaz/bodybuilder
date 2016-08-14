"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filterAggregation;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a filter with script for aggregation.
 *
 * @param  {String} filterName Filter Field name for reffernace.
 * @param  {String} filterRef Field name for filterName to referance in the aggrigation.
 * @param  {String} operator  Operator for script.
 * @param  {String} value  Value of script.
 * @return {Object}       Script Aggregation.
 */
function filterAggregation(filterName, filterRef, operator, value) {
  return _defineProperty({}, filterName, {
    bucket_selector: {
      buckets_path: _defineProperty({}, filterName, filterRef),
      script: filterName + " " + operator + " " + value
    }
  });
}