"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = termsQuery;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Terms query.
 *
 * @memberof Queries
 *
 * @param  {String}  field       Field name to query over.
 * @param  {Array}   terms       Array of query terms.
 * @return {Object}              Terms query.
 */
function termsQuery(field, terms) {
  return {
    terms: _defineProperty({}, field, terms)
  };
}