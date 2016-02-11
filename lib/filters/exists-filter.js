"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = existsFilter;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct an Exists filter.
 *
 * @param  {String} field Field name to query over.
 * @param  {String} term  Query value.
 * @return {Object}       Exists filter.
 */
function existsFilter(field, term) {
  return {
    exists: _defineProperty({}, field, term)
  };
}