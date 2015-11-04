import boolFilter from './bool-filter'
import existsFilter from './exists-filter'
import matchAllFilter from './exists-filter'
import missingFilter from './missing-filter'
import nestedFilter from './nested-filter'
import prefixFilter from './prefix-filter'
import rangeFilter from './range-filter'
import termFilter from './term-filter'
import termsFilter from './terms-filter'

export default {
  bool: boolFilter,
  boolean: boolFilter,
  exists: existsFilter,
  exist: existsFilter,
  matchAll: matchAllFilter,
  matchall: matchAllFilter,
  'match-all': matchAllFilter,
  match_all: matchAllFilter,
  missing: missingFilter,
  nested: nestedFilter,
  prefix: prefixFilter,
  range: rangeFilter,
  term: termFilter,
  terms: termsFilter
}
