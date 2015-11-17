import boolQuery from './bool-query'
import fuzzyQuery from './fuzzy-query'
import matchQuery from './match-query'
import rangeQuery from './range-query'
import termQuery from './term-query'
import termsQuery from './terms-query'
import multiMatchQuery from './multi-match-query'

export default {
  bool: boolQuery,
  boolean: boolQuery,
  fuzzy: fuzzyQuery,
  match: matchQuery,
  multi_match: multiMatchQuery,
  multiMatch: multiMatchQuery,
  range: rangeQuery,
  term: termQuery,
  terms: termsQuery
}
