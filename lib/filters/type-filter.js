/**
 * Construct a Type filter.
 *
 * @param  {String} type  Query value.
 * @return {Object}       Type filter.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = typeFilter;

function typeFilter(type) {
  return {
    type: {
      value: type
    }
  };
}

module.exports = exports["default"];