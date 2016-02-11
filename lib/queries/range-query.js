"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rangeQuery;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Range query.
 *
 * @param  {String} field  Field name to query over.
 * @param  {Object} ranges One or more range queries.
 * @return {Object}        Range query.
 */
function rangeQuery(field, ranges) {
  return {
    range: _defineProperty({}, field, ranges)
  };
}