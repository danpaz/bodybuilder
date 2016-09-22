"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = matchAllFilter;
/**
 * Construct a Match All filter.
 *
 * @memberof Filters
 *
 * @return {Object} Match All filter.
 */
function matchAllFilter() {
  return {
    match_all: {}
  };
}