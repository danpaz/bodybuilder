import boolQuery from './bool-query'
import fuzzyQuery from './fuzzy-query'
import matchQuery from './match-query'
import multiMatchQuery from './multi-match-query'
import queryStringQuery from './query-string-query'
import rangeQuery from './range-query'
import termQuery from './term-query'
import matchPhrasePrefix from './match-phrase-prefix'
import customQuery from './custom-query'

/**
 * Use these keys to select the query type when building a query clause.
 *
 * @example
 * var body = new Bodybuilder()
 *   .query('query_string', 'this AND that')
 *   .build()
 */
export default {
  bool: boolQuery,
  boolean: boolQuery,
  fuzzy: fuzzyQuery,
  match: matchQuery,
  multi_match: multiMatchQuery,
  multiMatch: multiMatchQuery,
  query_string: queryStringQuery,
  'query-string': queryStringQuery,
  queryString: queryStringQuery,
  range: rangeQuery,
  term: termQuery,
  matchPhrasePrefix: matchPhrasePrefix,
  customQuery: customQuery
}
