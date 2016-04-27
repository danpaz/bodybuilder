"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wildcardFilter;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Wildcard filter.
 *
 * @param  {String} field  Field name to query over.
 * @param  {String} regexp Query value.
 * @return {Object}        Wildcard filter.
 */
function wildcardFilter(field, regexp) {
  return {
    wildcard: _defineProperty({}, field, regexp)
  };
}