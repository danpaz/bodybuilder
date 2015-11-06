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

/**
 * Merge two filters or queries using Boolean filters or queries.
 *
 * @param  {String} type        Either 'filter' or 'query'.
 * @param  {Object} newObj      New filter to add.
 * @param  {Object} currentObj  Old filter to merge into.
 * @param  {String} bool        Type of boolean (and, or, not).
 * @return {Object}             Combined filter or query.
 */
function merge(type, newObj, currentObj, bool = 'and') {
  let typeClass = type === 'query' ? queries : filters
  let boolCurrent
  let boolNew

  // Only one, no need for bool.
  //
  if (!currentObj) {
    return newObj
  }

  // We have a single existing non-bool, need to merge with new.
  //
  boolNew = typeClass.bool(bool, newObj)

  if (!currentObj.bool) {
    boolCurrent = typeClass.bool(bool, currentObj)
    return mergeConcat({}, boolCurrent, boolNew)
  }

  // We have multiple existing, need to merge with new.
  //
  return mergeConcat({}, currentObj, boolNew)
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

  filter(type, ...args) {
    let klass = filters[type]
    let newFilter
    let currentFilter

    if (!klass) {
      throw new TypeError(`Filter type ${type} not found.`)
    }

    newFilter = klass(...args)
    this.query = this.query || {}
    this.query.filtered = this.query.filtered || {}
    currentFilter = this.query.filtered.filter
    this.query.filtered.filter = merge('filter', newFilter, currentFilter, 'and')
    return this
  }

  orFilter(type, ...args) {
    let klass = filters[type]
    let newFilter
    let currentFilter

    if (!klass) {
      throw new TypeError(`Filter type ${type} not found.`)
    }

    newFilter = klass(...args)
    this.query = this.query || {}
    this.query.filtered = this.query.filtered || {}
    currentFilter = this.query.filtered.filter
    this.query.filtered.filter = merge('filter', newFilter, currentFilter, 'or')
    return this
  }

  notFilter(type, ...args) {
    let klass = filters[type]
    let newFilter
    let currentFilter

    if (!klass) {
      throw new TypeError(`Filter type ${type} not found.`)
    }

    newFilter = klass(...args)
    this.query = this.query || {}
    this.query.filtered = this.query.filtered || {}
    currentFilter = this.query.filtered.filter
    this.query.filtered.filter = merge('filter', newFilter, currentFilter, 'not')
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
