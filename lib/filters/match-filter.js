"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = matchFilter;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Match filter.
 *
 * @memberof Filters
 *
 * @param  {String} field  Field name to query over.
 * @param  {String} term Query value.
 * @return {Object}        Match filter.
 */
function matchFilter(field, term) {
  return {
    match: _defineProperty({}, field, term)
  };
}