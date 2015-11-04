import _ from 'lodash'
import filters from './filters'
import aggregations from './aggregations'
import queries from './queries'

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
    boolNew = filters.bool(boolFilterType, filter)

    if (!currentFilters.bool) {
      boolCurrent = filters.bool(boolFilterType, currentFilters)
      return mergeConcat({}, boolCurrent, boolNew)
    }

    // We have multiple existing filters, need to merge with new.
    //
    return mergeConcat({}, currentFilters, boolNew)
  }

  filter(type, ...args) {
    let klass = filters[type]
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
    let klass = filters[type]
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
    let klass = filters[type]
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
    let klass = aggregations[type]
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
    let klass = queries[type]
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
