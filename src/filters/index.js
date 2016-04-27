import boolFilter from './bool-filter'
import existsFilter from './exists-filter'
import fuzzyFilter from './fuzzy-filter'
import matchAllFilter from './match-all-filter'
import missingFilter from './missing-filter'
import nestedFilter from './nested-filter'
import prefixFilter from './prefix-filter'
import rangeFilter from './range-filter'
import regexpFilter from './regexp-filter'
import wildcardFilter from './wildcard-filter'
import termFilter from './term-filter'
import termsFilter from './terms-filter'
import typeFilter from './type-filter'

/**
 * Use these keys to select the filter type when building a filter clause.
 *
 * @example
 * var body = new Bodybuilder()
 *   .filter('missing', 'user', 'kimchy')
 *   .build()
 */
export default {
  bool: boolFilter,
  boolean: boolFilter,
  exists: existsFilter,
  exist: existsFilter,
  fuzzy: fuzzyFilter,
  matchAll: matchAllFilter,
  matchall: matchAllFilter,
  'match-all': matchAllFilter,
  match_all: matchAllFilter,
  missing: missingFilter,
  nested: nestedFilter,
  prefix: prefixFilter,
  range: rangeFilter,
  regexp: regexpFilter,
  term: termFilter,
  terms: termsFilter,
  type: typeFilter,
  wildcard: wildcardFilter
}
