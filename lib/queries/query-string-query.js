"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = queryStringQuery;
/**
 * Construct a Query String query.
 *
 * @param  {String} term  Query value.
 * @return {Object}       Query String query.
 */
function queryStringQuery(term) {
  return {
    query_string: {
      query: term
    }
  };
}