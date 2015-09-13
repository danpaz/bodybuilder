import _ from 'lodash'
import boolFilter from './filters/bool-filter'
import existsFilter from './filters/exists-filter'
import matchAllFilter from './filters/exists-filter'
import missingFilter from './filters/missing-filter'
import prefixFilter from './filters/prefix-filter'
import rangeFilter from './filters/range-filter'
import termFilter from './filters/term-filter'
import termsFilter from './filters/terms-filter'

import termsAggregation from './aggregations/terms-aggregation'

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

const AGGREGATIONS_MAP = {
  terms: termsAggregation
}

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

  constructor() {
    this.query = {}
  }

  sort(direction) {
    this.sort = direction
    return this
  }

  size(quantity) {
    this.size = quantity
    return this
  }

  _addFilter(boolFilterType, filter) {
    let currentFilters = this.query.filtered.filter
    let boolCurrent
    let boolNew

    // First argument is optional, defaults to 'and'.
    //
    if(boolFilterType && !filter) {
      filter = boolFilterType
      boolFilterType = 'and'
    }

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

    return
  }

  filter(type, ...args) {
    let klass = FILTERS_MAP[type]
    let filter

    if (!klass) {
      throw new Error('Filter type not found.', type)
    }

    filter = klass(...args)
    this.query.filtered = this.query.filtered || {}
    this.query.filtered.filter = this._addFilter('and', filter)
    return this
  }

  orFilter(type, ...args) {
    let klass = FILTERS_MAP[type]
    let filter

    if (!klass) {
      throw new Error('Filter type not found.', type)
    }

    filter = klass(...args)
    this.query.filtered = this.query.filtered || {}
    this.query.filtered.filter = this._addFilter('or', filter)
    return this
  }

  notFilter(type, ...args) {
    let klass = FILTERS_MAP[type]
    let filter

    if (!klass) {
      throw new Error('Filter type not found.', type)
    }

    filter = klass(...args)
    this.query.filtered = this.query.filtered || {}
    this.query.filtered.filter = this._addFilter('not', filter)
    return this
  }

  aggregation(type, ...args) {
    let klass = AGGREGATIONS_MAP[type]
    let aggregation

    if (!klass) {
      throw new Error('Aggregation type not found.', type)
    }

    aggregation = klass(...args)
    this.query.aggregations = _.merge({}, this.query.aggregations, aggregation)
    return this
  }

}
