/**
 * Construct a Match All filter.
 *
 * @return {Object} Match All filter.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = matchAllFilter;

function matchAllFilter() {
  return {
    match_all: {}
  };
}

module.exports = exports["default"];