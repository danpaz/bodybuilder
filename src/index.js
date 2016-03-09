import _ from 'lodash'
import filters from './filters'
import aggregations from './aggregations'
import queries from './queries'
import { boolMerge } from './utils'

/**
 * The main builder class.
 *
 * @example
 * var body = new Bodybuilder()
 *   .query('match', 'text', 'this is a test')
 *   .build()
 */
export default class BodyBuilder {

  constructor() {
    this._body = {}
    this._filters = {}
    this._queries = {}
    this._aggregations = {}
  }

  /**
   * Constructs the elasticsearch query body in its current state.
   * @param  {String} version             Version to generate.
   * @returns {Object} Query body.
   */
  build(version) {
    if (!_.isUndefined(version) && version === 'v2') return this._buildV2();
    return this._buildV1();
  }

  _buildV1() {
    let body = _.clone(this._body)
    const filters = this._filters
    const queries = this._queries
    const aggregations = this._aggregations

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

  _buildV2() {
    let body = _.clone(this._body)
    const filters = this._filters
    const queries = this._queries
    const aggregations = this._aggregations

    if (!_.isEmpty(filters)) {
      let filterBody = {};
      let queryBody = {};
      _.set(filterBody, 'query.bool.filter', filters)
      if (!_.isEmpty(queries.bool)) {
        _.set(queryBody, 'query.bool', queries.bool)
      } else if (!_.isEmpty(queries)) {
        _.set(queryBody, 'query.bool.must', queries)
      }
      _.merge(body, filterBody, queryBody);
    } else if (!_.isEmpty(queries)) {
      _.set(body, 'query', queries)
    }

    if (!_.isEmpty(aggregations)) {
      _.set(body, 'aggs', aggregations)
    }

    return body
  }

  /**
   * Set a sort direction on a given field.
   *
   * @param  {String} field             Field name.
   * @param  {String} [direction='asc'] A valid direction: 'asc' or 'desc'.
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
   * @param  {String}  type Name of the filter type.
   * @param  {...args} args Arguments passed to filter builder.
   * @returns {BodyBuilder} Builder class.
   */
  filter(type, ...args) {
    this._filter('and', type, ...args)
    return this
  }

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

  /**
   * Alias to BodyBuilder#filter.
   *
   * @private
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
   * @param  {String}  type Name of the query type.
   * @param  {...args} args Arguments passed to query builder.
   * @returns {BodyBuilder} Builder class.
   */
  query(type, ...args) {
    this._query('and', type, ...args)
    return this
  }

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

  /**
   * Alias to BodyBuilder#query.
   *
   * @private
   *
   * @returns {BodyBuilder} Builder class.
   */
  andQuery(...args) {
    return this.query(...args)
  }

  /**
   * Alias to BodyBuilder#query.
   *
   * @private
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
    this._aggregations = _.merge({}, this._aggregations, aggregation)
    return this
  }

  /**
   * Alias to BodyBuilder#aggregation.
   *
   * @private
   *
   * @returns {BodyBuilder} Builder class.
   */
  agg(...args) {
    return this.aggregation(...args)
  }

}
