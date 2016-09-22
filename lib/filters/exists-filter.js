"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = existsFilter;
/**
 * Construct an Exists filter.
 *
 * @memberof Filters
 *
 * @param  {String} field Field name to check existence.
 * @return {Object}       Exists filter.
 */
function existsFilter(field) {
  return {
    exists: {
      field: field
    }
  };
}