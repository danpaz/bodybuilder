"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = regexpFilter;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Regexp filter.
 *
 * @memberof Filters
 *
 * @param  {String} field  Field name to query over.
 * @param  {String} regexp Query value.
 * @return {Object}        Regexp filter.
 */
function regexpFilter(field, regexp) {
  return {
    regexp: _defineProperty({}, field, regexp)
  };
}