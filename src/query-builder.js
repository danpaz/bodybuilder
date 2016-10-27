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
    this._filters = {}
    this._aggs = {}
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
  _makeQuery(boolType, ...args) {
    let nested = _.last(args)

    let newQuery = this._buildQuery(...args)

    if (_.isFunction(nested)) {
      let clause = _.find(newQuery)
      let builder = new QueryBuilder()
      let recursiveResult = nested(builder)
      if (!_.isEmpty(recursiveResult._aggs)) {clause.aggs = recursiveResult._aggs}
      if (!_.isEmpty(recursiveResult._queries)) {clause.query = recursiveResult._queries}
      if (!_.isEmpty(recursiveResult._filters)) {clause.filter = recursiveResult._filters}
    }

    return boolMerge(newQuery, this._queries, boolType)
  }

  _buildQuery(type, field, value, opts) {
    let clause = {}

    if (field && value && opts) {
      clause = Object.assign({}, opts, {[field]: value})
    } else if (field && value) {
      clause = {[field]: value}
    } else if (field) {
      clause = {field}
    }

    return {[type]: clause}
  }

  _makeFilter(boolType, ...args) {
    let nested = _.last(args)

    let newFilter = this._buildFilter(...args)

    if (_.isFunction(nested)) {
      let clause = _.find(newFilter)
      let builder = new QueryBuilder()
      let recursiveResult = nested(builder)

      if (!_.isEmpty(recursiveResult._aggs)) {clause.aggs = recursiveResult._aggs}
      if (!_.isEmpty(recursiveResult._queries)) {clause.query = recursiveResult._queries}
      if (!_.isEmpty(recursiveResult._filters)) {clause.filter = recursiveResult._filters}
    }

    return boolMerge(newFilter, this._filters, boolType)
  }

  _buildFilter(type, field, value, opts) {
    let clause = {}

    if (field && value && opts) {
      clause = Object.assign({}, opts, {[field]: value})
    } else if (field && value) {
      clause = {[field]: value}
    } else if (field) {
      clause = {field}
    }

    return {[type]: clause}
  }

  _makeAggregation(...args) {
    let nested = _.last(args)

    let newAggregation = this._buildAggregation(...args)

    if (_.isFunction(nested)) {
      let clause = _.find(newAggregation)
      let builder = new QueryBuilder()
      let recursiveResult = nested(builder)
      if (!_.isEmpty(recursiveResult._aggs)) {clause.aggs = recursiveResult._aggs}
      if (!_.isEmpty(recursiveResult._queries)) {clause.query = recursiveResult._queries}
      if (!_.isEmpty(recursiveResult._filters)) {clause.filter = recursiveResult._filters}
    }

    return newAggregation
  }

  _buildAggregation(type, field, name, opts) {
    if (_.isObject(name)) {
      let tmp = opts
      opts = name
      name = tmp
    }

    name = name || `agg_${type}_${field}`

    return {
      [name]: {
        [type]: (() => Object.assign({}, {field}, opts))()
      }
    }
  }

  query(...args) {
    this._queries = this._makeQuery('and', ...args)
    return this
  }

  andQuery(...args) {
    this._queries = this._makeQuery('and', ...args)
    return this
  }

  addQuery(...args) {
    this._queries = this._makeQuery('and', ...args)
    return this
  }

  orQuery(...args) {
    this._queries = this._makeQuery('or', ...args)
    return this
  }

  notQuery(...args) {
    this._queries = this._makeQuery('not', ...args)
    return this
  }

  filter(...args) {
    this._filters = this._makeFilter('and', ...args)
    return this
  }

  andFilter(...args) {
    this._filters = this._makeFilter('and', ...args)
    return this
  }

  orFilter(...args) {
    this._filters = this._makeFilter('or', ...args)
    return this
  }

  notFilter(...args) {
    this._filters = this._makeFilter('not', ...args)
    return this
  }

  aggregation(...args) {
    this._aggs = this._makeAggregation(...args)
    return this
  }

  agg(...args) {
    this._aggs = this.aggregation(...args)
    return this
  }

}
