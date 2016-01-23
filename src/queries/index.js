import boolQuery from './bool-query'
import fuzzyQuery from './fuzzy-query'
import matchQuery from './match-query'
import multiMatchQuery from './multi-match-query'
import queryStringQuery from './query-string-query'
import rangeQuery from './range-query'
import termQuery from './term-query'
import termsQuery from './terms-query'

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
  terms: termsQuery
}
