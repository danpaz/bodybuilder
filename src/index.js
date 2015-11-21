import _ from 'lodash'
import filters from './filters'
import aggregations from './aggregations'
import queries from './queries'
import { boolMerge } from './utils'

export default class BodyBuilder {

  constructor() {
    this._body = {}
  }

  /**
   * Returns a copy of the elasticsearch query body in its current state.
   *
   * @return {Object} Query body.
   */
  build() {
    return _.clone(this._body)
  }

  /**
   * Set a sort direction on a given field.
   *
   * @param  {String} field     Field name.
   * @param  {String} direction (Optional) A valid direction: 'asc' or 'desc'.
   *                            Defaults to 'asc'.
   * @return {BodyBuilder}
   */
  sort(field, direction = 'asc') {
    this._body.sort = {
      [field]: {
        order: direction
      }
    }
    return this
  }

  /**
   * Set a *from* offset value, for paginating a query.
   *
   * @param  {Number} quantity The offset from the first result you want to
   *                           fetch.
   * @return {BodyBuilder}
   */
  from(quantity) {
    this._body.from = quantity
    return this
  }

  /**
   * Set a *size* value for maximum results to return.
   *
   * @param  {Number} quantity Maximum number of results to return.
   * @return {BodyBuilder}
   */
  size(quantity) {
    this._body.size = quantity
    return this
  }

  /**
   * Set any key-value on the elasticsearch body.
   *
   * @param  {String} k Key.
   * @param  {String} v Value.
   * @return {BodyBuilder}
   */
  rawOption(k, v) {
    this._body[k] = v
    return this
  }

  /**
   * Apply a filter of a given type providing all the necessary arguments,
   * passing these arguments directly to the specified filter builder. Merges
   * existing filter(s) with the new filter.
   *
   * @param  {String}  type Name of the filter type.
   * @param  {...args} args Arguments passed to filter builder.
   * @return {BodyBuilder}
   */
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
    this._body.query.filtered.filter =
      boolMerge('filter', newFilter, currentFilter, 'or')
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
    this._body.query.filtered.filter =
      boolMerge('filter', newFilter, currentFilter, 'not')
    return this
  }

  /**
   * Apply a aggregation of a given type providing all the necessary arguments,
   * passing these arguments directly to the specified aggregation builder.
   * Merges existing aggregation(s) with the new aggregation.
   *
   * @param  {String}  type Name of the aggregation type.
   * @param  {...args} args Arguments passed to aggregation builder.
   * @return {BodyBuilder}
   */
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

  /**
   * Apply a query of a given type providing all the necessary arguments,
   * passing these arguments directly to the specified query builder. Merges
   * existing query(s) with the new query.
   *
   * @param  {String}  type Name of the query type.
   * @param  {...args} args Arguments passed to query builder.
   * @return {BodyBuilder}
   */
  query(type, ...args) {
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
    this._body.query.filtered.query =
      boolMerge('query', newQuery, currentQuery, 'and')
    return this
  }

  /**
   * Alias to BodyBuilder#query.
   */
  addQuery(...args) {
    return this.query(...args)
  }
}
