"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixFilter;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Prefix filter.
 *
 * @memberof Filters
 *
 * @param  {String} field      Field name to query over.
 * @param  {String} prefixTerm Query value.
 * @return {Object}            Prefix filter.
 */
function prefixFilter(field, prefixTerm) {
  return {
    prefix: _defineProperty({}, field, prefixTerm)
  };
}