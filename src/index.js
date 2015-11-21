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
function boolMerge(type, newObj, currentObj, bool = 'and') {
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

  constructor() {
    this._body = {}
  }

  build() {
    return _.clone(this._body)
  }

  sort(field, direction = 'asc') {
    this._body.sort = {
      [field]: {
        order: direction
      }
    }
    return this
  }

  from(quantity) {
    this._body.from = quantity
    return this
  }

  size(quantity) {
    this._body.size = quantity
    return this
  }

  rawOption(k, v) {
    this._body[k] = v
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
    this._body.query = this._body.query || {}
    this._body.query.filtered = this._body.query.filtered || {}
    currentFilter = this._body.query.filtered.filter
    this._body.query.filtered.filter = boolMerge('filter', newFilter, currentFilter, 'and')
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
    this._body.query = this._body.query || {}
    this._body.query.filtered = this._body.query.filtered || {}
    currentFilter = this._body.query.filtered.filter
    this._body.query.filtered.filter = boolMerge('filter', newFilter, currentFilter, 'or')
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
    this._body.query = this._body.query || {}
    this._body.query.filtered = this._body.query.filtered || {}
    currentFilter = this._body.query.filtered.filter
    this._body.query.filtered.filter = boolMerge('filter', newFilter, currentFilter, 'not')
    return this
  }

  aggregation(type, ...args) {
    let klass = aggregations[type]
    let aggregation

    if (!klass) {
      throw new TypeError(`Aggregation type ${type} not found.`)
    }

    aggregation = klass(...args)
    this._body.aggregations = _.merge({}, this._body.aggregations, aggregation)
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
    let newQuery
    let currentQuery

    if (!klass) {
      throw new TypeError(`Query type ${type} not found.`)
    }

    newQuery = klass(...args)

    this._body.query = this._body.query || {}
    this._body.query.filtered = this._body.query.filtered || {}
    currentQuery = this._body.query.filtered.query
    this._body.query.filtered.query = boolMerge('query', newQuery, currentQuery, 'and')
    return this
  }

}
