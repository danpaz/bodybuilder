/**
 * Construct a Query String query.
 *
 * @param  {String} term  Query value.
 * @return {Object}       Query String query.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = queryStringQuery;

function queryStringQuery(term) {
  return {
    query_string: {
      query: term
    }
  };
}

module.exports = exports["default"];