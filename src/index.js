import _ from 'lodash'
import boolFilter from './filters/bool-filter'
import existsFilter from './filters/exists-filter'
import matchAllFilter from './filters/exists-filter'
import missingFilter from './filters/missing-filter'
import nestedFilter from './filters/nested-filter'
import prefixFilter from './filters/prefix-filter'
import rangeFilter from './filters/range-filter'
import termFilter from './filters/term-filter'
import termsFilter from './filters/terms-filter'

import termsAggregation from './aggregations/terms-aggregation'
import maxAggregation from './aggregations/max-aggregation'
import minAggregation from './aggregations/min-aggregation'

import fuzzyQuery from './queries/fuzzy-query'
import matchQuery from './queries/match-query'
import rangeQuery from './queries/range-query'
import termQuery from './queries/term-query'
import termsQuery from './queries/terms-query'

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
  nested: nestedFilter,
  prefix: prefixFilter,
  range: rangeFilter,
  term: termFilter,
  terms: termsFilter
}

const AGGREGATIONS_MAP = {
  terms: termsAggregation,
  min: minAggregation,
  max: maxAggregation
}

const QUERIES_MAP = {
  fuzzy: fuzzyQuery,
  match: matchQuery,
  range: rangeQuery,
  term: termQuery,
  terms: termsQuery,
}

/**
 * Extends lodash's merge by allowing array concatenation.
 */
function mergeConcat(target) {
  let args = Array.prototype.slice.call(arguments, 1)

  args.unshift(target)
  args.push(function concatArray(a, b) {
    if (Array.isArray(a)) {
      return a.concat(b)
    }
  })

  return _.merge.apply(null, args)
}

export default class BodyBuilder {

  sort(field, direction) {
    this.sort = {
      [field]: {
        order: direction
      }
    }
    return this
  }

  size(quantity) {
    this.size = quantity
    return this
  }

  rawOption(k, v) {
    this[k] = v
    return this
  }

  _addFilter(filter, boolFilterType = 'and') {
    let currentFilters = this.query.filtered.filter
    let boolCurrent
    let boolNew

    // Only one filter, no need for bool filters.
    //
    if (!currentFilters) {
      return filter
    }

    // We have a single existing non-bool filter, need to merge with new.
    //
    boolNew = boolFilter(boolFilterType, filter)

    if (!currentFilters.bool) {
      boolCurrent = boolFilter(boolFilterType, currentFilters)
      return mergeConcat({}, boolCurrent, boolNew)
    }

    // We have multiple existing filters, need to merge with new.
    //
    return mergeConcat({}, currentFilters, boolNew)
  }

  filter(type, ...args) {
    let klass = FILTERS_MAP[type]
    let filter

    if (!klass) {
      throw new TypeError(`Filter type ${type} not found.`)
    }

    filter = klass(...args)
    this.query = this.query || {}
    this.query.filtered = this.query.filtered || {}
    this.query.filtered.filter = this._addFilter(filter, 'and')
    return this
  }

  orFilter(type, ...args) {
    let klass = FILTERS_MAP[type]
    let filter

    if (!klass) {
      throw new TypeError(`Filter type ${type} not found.`)
    }

    filter = klass(...args)
    this.query = this.query || {}
    this.query.filtered = this.query.filtered || {}
    this.query.filtered.filter = this._addFilter(filter, 'or')
    return this
  }

  notFilter(type, ...args) {
    let klass = FILTERS_MAP[type]
    let filter

    if (!klass) {
      throw new TypeError(`Filter type ${type} not found.`)
    }

    filter = klass(...args)
    this.query = this.query || {}
    this.query.filtered = this.query.filtered || {}
    this.query.filtered.filter = this._addFilter(filter, 'not')
    return this
  }

  aggregation(type, ...args) {
    let klass = AGGREGATIONS_MAP[type]
    let aggregation

    if (!klass) {
      throw new TypeError(`Aggregation type ${type} not found.`)
    }

    aggregation = klass(...args)
    this.aggregations = _.merge({}, this.aggregations, aggregation)
    return this
  }

  /**
   * Alias to BodyBuilder#aggregation.
   */
  agg(...args) {
    return this.aggregation(...args)
  }

  addQuery(type, ...args) {
    let klass = QUERIES_MAP[type]
    let query

    if (!klass) {
      throw new TypeError(`Query type ${type} not found.`)
    }

    query = klass(...args)

    this.query = this.query || {}
    this.query.filtered = this.query.filtered || {}
    this.query.filtered.query = query

    return this
  }

}
