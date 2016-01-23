import _ from 'lodash'
import filters from './filters'
import aggregations from './aggregations'
import queries from './queries'
import { boolMerge } from './utils'

/**
 * The main builder class.
 */
export default class BodyBuilder {

  constructor() {
    this._body = {}
    this._filters = {}
    this._queries = {}
    this._aggreggations = {}
  }

  /**
   * Constructs the elasticsearch query body in its current state.
   *
   * @returns {Object} Query body.
   */
  build() {
    let body = _.clone(this._body)
    const filters = this._filters
    const queries = this._queries
    const aggregations = this._aggreggations

    if (!_.isEmpty(filters)) {
      _.set(body, 'query.filtered.filter', filters)

      if (!_.isEmpty(queries)) {
        _.set(body, 'query.filtered.query', queries)
      }

    } else if (!_.isEmpty(queries)) {
      _.set(body, 'query', queries)
    }

    if (!_.isEmpty(aggregations)) {
      _.set(body, 'aggregations', aggregations)
    }

    return body
  }

  /**
   * Set a sort direction on a given field.
   *
   * @param  {String} field     Field name.
   * @param  {String} direction (Optional) A valid direction: 'asc' or 'desc'.
   *                            Defaults to 'asc'.
   * @returns {BodyBuilder} Builder class.
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
   * @returns {BodyBuilder} Builder class.
   */
  from(quantity) {
    this._body.from = quantity
    return this
  }

  /**
   * Set a *size* value for maximum results to return.
   *
   * @param  {Number} quantity Maximum number of results to return.
   * @returns {BodyBuilder} Builder class.
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
   * @returns {BodyBuilder} Builder class.
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
   * @param  {String}  boolType   Whether to combine as 'and', 'or', or 'not'.
   * @param  {String}  filterType Name of the filter type.
   * @param  {...args} args       Arguments passed to filter builder.
   * @returns {BodyBuilder} Builder class.
   */
  _filter(boolType, filterType, ...args) {
    let klass = filters[filterType]
    let newFilter

    if (!klass) {
      throw new TypeError(`Filter type ${filterType} not found.`)
    }

    newFilter = klass(...args)
    this._filters = boolMerge(newFilter, this._filters, boolType)
    return this
  }

  filter(type, ...args) {
    this._filter('and', type, ...args)
    return this
  }

  /**
   * Alias to BodyBuilder#filter.
   *
   * @returns {BodyBuilder} Builder class.
   */
  andFilter(...args) {
    return this._filter(...args)
  }

  orFilter(type, ...args) {
    this._filter('or', type, ...args)
    return this
  }

  notFilter(type, ...args) {
    this._filter('not', type, ...args)
    return this
  }

  /**
   * Apply a query of a given type providing all the necessary arguments,
   * passing these arguments directly to the specified query builder. Merges
   * existing query(s) with the new query.
   *
   * @param  {String}  boolType  Whether to combine as 'and', 'or', or 'not'.
   * @param  {String}  queryType Name of the query type.
   * @param  {...args} args      Arguments passed to query builder.
   * @returns {BodyBuilder} Builder class.
   */
  _query(boolType, queryType, ...args) {
    let klass = queries[queryType]
    let newQuery

    if (!klass) {
      throw new TypeError(`Query type ${queryType} not found.`)
    }

    newQuery = klass(...args)
    this._queries = boolMerge(newQuery, this._queries, boolType)
    return this
  }

  query(...args) {
    this._query('and', ...args)
    return this
  }

  /**
   * Alias to BodyBuilder#query.
   *
   * @returns {BodyBuilder} Builder class.
   */
  andQuery(...args) {
    return this.query(...args)
  }

  /**
   * Alias to BodyBuilder#query.
   *
   * @returns {BodyBuilder} Builder class.
   */
  addQuery(...args) {
    return this.query(...args)
  }

  orQuery(type, ...args) {
    this._query('or', type, ...args)
    return this
  }

  notQuery(type, ...args) {
    this._query('not', type, ...args)
    return this
  }

  /**
   * Apply a aggregation of a given type providing all the necessary arguments,
   * passing these arguments directly to the specified aggregation builder.
   * Merges existing aggregation(s) with the new aggregation.
   *
   * @param  {String}  type Name of the aggregation type.
   * @param  {...args} args Arguments passed to aggregation builder.
   * @returns {BodyBuilder} Builder class.
   */
  aggregation(type, ...args) {
    let klass = aggregations[type]
    let aggregation

    if (!klass) {
      throw new TypeError(`Aggregation type ${type} not found.`)
    }

    aggregation = klass(...args)
    this._aggreggations = _.merge({}, this._aggreggations, aggregation)
    return this
  }

  /**
   * Alias to BodyBuilder#aggregation.
   *
   * @returns {BodyBuilder} Builder class.
   */
  agg(...args) {
    return this.aggregation(...args)
  }

}
