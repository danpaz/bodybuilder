"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typeQuery;
/**
 * Construct a Type query.
 *
 * @memberof Queries
 *
 * @param  {String} type  Type value.
 * @return {Object}       Type query.
 */
function typeQuery(type) {
  return {
    type: {
      value: type
    }
  };
}