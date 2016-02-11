"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = missingFilter;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Missing filter.
 *
 * @param  {String} field Field name to query over.
 * @param  {String} term  Query value.
 * @return {Object}       Missing filter.
 */
function missingFilter(field, term) {
  return {
    missing: _defineProperty({}, field, term)
  };
}