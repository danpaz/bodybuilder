import _ from 'lodash'
import {boolMerge} from './utils'

/**
 * QueryBuilder class to build query clauses.
 *
 * @private
 */
export default class QueryBuilder {

  constructor() {
    this._queries = {}
  }

  get queries() {
    return _.cloneDeep(this._queries)
  }

  /**
   * Apply a query of a given type providing all the necessary arguments,
   * passing these arguments directly to the specified query builder. Merges
   * existing query(s) with the new query.
   *
   * @param  {String}  boolType Name of the query type.
   * @param  {...args} args     Arguments passed to query builder.
   * @returns {QueryBuilder}    Builder class.
   */
  _query(boolType, ...args) {
    let nested = _.last(args)

    let newQuery = this._build(...args)

    if (_.isFunction(nested)) {
      let clause = newQuery[_.findKey(newQuery)]
      let builder = new QueryBuilder()
      clause.query = nested(builder)._queries
      this._queries = newQuery
    } else {
      this._queries = boolMerge(newQuery, this._queries, boolType)
    }

    return this
  }

  _build(type, field, value, opts) {
    let clause = {}

    if (field && value && opts) {
      clause = _.merge({[field]: value}, opts)
    } else if (field && value) {
      clause = {[field]: value}
    } else if (field) {
      clause = {field}
    }

    return {[type]: clause}
  }

  query(...args) {
    this._query('and', ...args)
    return this
  }

  andQuery(...args) {
    this._query('and', ...args)
    return this
  }

  addQuery(...args) {
    this._query('and', ...args)
    return this
  }

  orQuery(...args) {
    this._query('or', ...args)
    return this
  }

  notQuery(...args) {
    this._query('not', ...args)
    return this
  }
}
