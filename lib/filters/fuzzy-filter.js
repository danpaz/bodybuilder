"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fuzzyFilter;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Fuzzy filter.
 *
 * @param  {String} field  Field name to query over.
 * @param  {String} term Query value.
 * @return {Object}        Fuzzy filter.
 */
function fuzzyFilter(field, term) {
  return {
    fuzzy: _defineProperty({}, field, term)
  };
}