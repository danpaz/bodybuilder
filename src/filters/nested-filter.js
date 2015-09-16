import boolFilter from './bool-filter'
import existsFilter from './exists-filter'
import matchAllFilter from './exists-filter'
import missingFilter from './missing-filter'
import prefixFilter from './prefix-filter'
import rangeFilter from './range-filter'
import termFilter from './term-filter'
import termsFilter from './terms-filter'

const FILTERS_MAP = {
  bool: boolFilter,
  boolean: boolFilter,
  exists: existsFilter,
  exist: existsFilter,
  matchAll: matchAllFilter,
  matchall: matchAllFilter,
  'match-all': matchAllFilter,
  match_all: matchAllFilter,
  missing: missingFilter,
  prefix: prefixFilter,
  range: rangeFilter,
  term: termFilter,
  terms: termsFilter
}

/**
 * Construct a Nested filter: a filter inside a filter.
 *
 * elastic.co/guide/en/elasticsearch/reference/current/query-dsl-nested-filter.html
 *
 * @param  {String} path  Name of the field containing the nested fields.
 * @param  {String} type  Name of the desired nested filter.
 * @param  {String} field Name of the nested field.
 * @param  {Array}  args  Remaining arguments used to construct nested filter.
 * @return {Object}       Nested filter.
 */
export default function nestedFilter(path, type, field, ...args) {
  let klass = FILTERS_MAP[type]
  let nestedField = `${path}.${field}`
  let filter

  if (!klass) {
    throw new Error('Filter type not found.', type)
  }

  filter = klass(nestedField, ...args)

  return {
    nested: {
      path: path,
      filter: filter
    }
  }
}
