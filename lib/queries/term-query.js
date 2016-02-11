"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = termQuery;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Term query.
 *
 * @param  {String} field Field name to query over.
 * @param  {String} term  Query value.
 * @return {Object}       Term query.
 */
function termQuery(field, term) {
  return {
    term: _defineProperty({}, field, term)
  };
}