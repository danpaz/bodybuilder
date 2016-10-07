import _ from 'lodash'
import FilterBuilder from './filters/filter-builder'
import queries from './queries'
import AggregationBuilder from './aggregations/aggregation-builder'
import { boolMerge, sortMerge } from './utils'

/**
 * The main builder class.
 *
 * @example
 * var body = new Bodybuilder()
 *   .query('match', 'text', 'this is a test')
 *   .build()
 */
class Bodybuilder {

  constructor() {
    this._body = {}
    this._filterBuilder = new FilterBuilder()
    this._queries = {}
    this._aggBuilder = Object.create(AggregationBuilder)
  }

  /**
   * Constructs the elasticsearch query body in its current state.
   * @param  {String} version             Version to generate.
   * @returns {Object} Query body.
   */
  build(version) {
    if (version === 'v2') return this._buildV2()
    return this._buildV1()
  }

  _buildV1() {
    let body = _.clone(this._body)
    const filters = this._filterBuilder.filters
    const queries = this._queries
    const aggregations = this._aggBuilder.aggregations

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
    const filters = this._filterBuilder.filters
    const queries = this._queries
    const aggregations = this._aggBuilder.aggregations

    if (!_.isEmpty(filters)) {
      let filterBody = {}
      let queryBody = {}
      _.set(filterBody, 'query.bool.filter', filters)
      if (!_.isEmpty(queries.bool)) {
        _.set(queryBody, 'query.bool', queries.bool)
      } else if (!_.isEmpty(queries)) {
        _.set(queryBody, 'query.bool.must', queries)
      }
      _.merge(body, filterBody, queryBody)
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
   * @returns {Bodybuilder} Builder class.
   */
  sort(field, direction = 'asc') {
    this._body.sort = this._body.sort || []

    if (_.isArray(field)) {

        if(_.isPlainObject(this._body.sort)) {
            this._body.sort = [this._body.sort]
        }

        if(_.isArray(this._body.sort)) {
            _.each(field, (sorts) => {
                _.each(sorts, (value, key) => {
                    sortMerge(this._body.sort, key, value)
                })
            })

        }
    } else {
      sortMerge(this._body.sort, field, direction)
    }
    return this
  }

  /**
   * Set a *from* offset value, for paginating a query.
   *
   * @param  {Number} quantity The offset from the first result you want to
   *                           fetch.
   * @returns {Bodybuilder} Builder class.
   */
  from(quantity) {
    this._body.from = quantity
    return this
  }

  /**
   * Set a *size* value for maximum results to return.
   *
   * @param  {Number} quantity Maximum number of results to return.
   * @returns {Bodybuilder} Builder class.
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
   * @returns {Bodybuilder} Builder class.
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
   * @returns {Bodybuilder} Builder class.
   */
  filter(...args) {
    this._filterBuilder.filter(...args)
    return this
  }

  andFilter(...args) {
    this._filterBuilder.andFilter(...args)
    return this
  }

  orFilter(...args) {
    this._filterBuilder.orFilter(...args)
    return this
  }

  notFilter(...args) {
    this._filterBuilder.notFilter(...args)
    return this
  }

  /**
   * Apply a query of a given type providing all the necessary arguments,
   * passing these arguments directly to the specified query builder. Merges
   * existing query(s) with the new query.
   *
   * @param  {String}  type Name of the query type.
   * @param  {...args} args Arguments passed to query builder.
   * @returns {Bodybuilder} Builder class.
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
   * Alias to Bodybuilder#query.
   *
   * @private
   *
   * @returns {Bodybuilder} Builder class.
   */
  andQuery(...args) {
    return this.query(...args)
  }

  /**
   * Alias to Bodybuilder#query.
   *
   * @private
   *
   * @returns {Bodybuilder} Builder class.
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
   * Merges existing aggregation(s) with the new aggregation. You may nest
   * aggregations by passing in a `Function` callback as the last parameter.
   * The callback will receive the newly built aggregation upon which you can
   * keep calling `aggregation(type, ...args)`.
   *
   * @example
   * var body = new Bodybuilder()
   *   .query('match', 'text', 'this is a test')
   *   .aggregation('terms', 'someField', 'bySomeField',
   *     // Nest aggregations on "bySomeField"
   *     agg =>
   *       agg
   *         .agregation('max', 'someOtherField')
   *         .aggregation('missing', 'anotherField')
   *    )
   *   .build()
   *
   *
   * @param  {String}  type Name of the aggregation type.
   * @param  {...args} args Arguments passed to aggregation builder. May include
   *                        am optional nesting function as its last element.
   * @returns {Bodybuilder} Builder class.
   */
  aggregation(type, ...args) {
    this._aggBuilder.add(type, ...args)
    return this
  }

  /**
   * Alias to Bodybuilder#aggregation.
   *
   * @private
   *
   * @returns {Bodybuilder} Builder class.
   */
  agg(...args) {
    return this.aggregation(...args)
  }

}

module.exports = Bodybuilder
