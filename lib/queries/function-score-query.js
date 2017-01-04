'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = functionScoreQuery;
var assign = require('lodash/assign');

/**
 * Construct a function_score query
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html
 *
 * @memberof Queries
 *
 * @param  {Array}  functions  Array of scoring function
 * @param  {Object} opts       Optional function_score fields
 * @return {Object}            Function score query
 */
function functionScoreQuery(functions) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return {
    function_score: assign({
      functions: functions
    }, opts)
  };
}