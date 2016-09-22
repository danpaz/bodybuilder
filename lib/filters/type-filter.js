"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typeFilter;
/**
 * Construct a Type filter.
 *
 * @memberof Filters
 *
 * @param  {String} type  Query value.
 * @return {Object}       Type filter.
 */
function typeFilter(type) {
  return {
    type: {
      value: type
    }
  };
}