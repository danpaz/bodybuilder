"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = missingFilter;
/**
 * Construct a Missing filter.
 *
 * @memberof Filters
 *
 * @param  {String} field Field name to check if missing.
 * @return {Object}       Missing filter.
 */
function missingFilter(field) {
  return {
    missing: {
      field: field
    }
  };
}