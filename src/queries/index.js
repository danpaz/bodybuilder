import boolQuery from './bool-query'
import fuzzyQuery from './fuzzy-query'
import matchQuery from './match-query'
import rangeQuery from './range-query'
import termQuery from './term-query'
import termsQuery from './terms-query'

export default {
  bool: boolQuery,
  boolean: boolQuery,
  fuzzy: fuzzyQuery,
  match: matchQuery,
  range: rangeQuery,
  term: termQuery,
  terms: termsQuery
}
