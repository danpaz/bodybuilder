/**
 * Construct a function_score query
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html
 * @param  {Array}  functions  Array of scoring function
 * @param  {Object} opts       Optional function_score fields
 * @return {Object}            Function score query
 */
export default function functionScoreQuery(functions, opts = {}) {
  return {
    function_score: Object.assign({}, {
      functions
    }, opts)
  }
}
