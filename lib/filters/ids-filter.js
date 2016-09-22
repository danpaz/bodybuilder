"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = idsFilter;
/**
 * Construct an Ids filter.
 *
 * @param  {Array} values Ids
 * @return {Object}       Ids filter.
 */
function idsFilter(values) {
  return {
    ids: {
      values: values
    }
  };
}