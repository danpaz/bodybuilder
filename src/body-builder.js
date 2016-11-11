import _ from 'lodash'
import {boolMerge} from './utils'

function bodyBuilder () {
  return Object.assign(
    { /* sort, from, build, etc. go here */ },
    queryBuilder(),
    filterBuilder(),
    aggregationBuilder()
  )
}

/**
 * Generic builder for filter and query clauses
 *
 * @private
 *
 * @param  {string} field
 * @param  {any}    value
 * @param  {Object} opts
 * @return {Object}       query clause component
 */
function buildClause (field, value, opts) {
  const clause = {}

  if (field && value && opts) {
    Object.assign(clause, opts, {[field]: value})
  } else if (field && value) {
    clause[field] = value
  } else if (field) {
    clause.field = field
  }

  return clause
}

function queryBuilder () {
  let query = {}

  function makeQuery (boolType, queryType, ...args) {
    const nested = {}
    if (_.isFunction(_.last(args))) {
      const nestedCallback = args.pop()
      const nestedResult = nestedCallback(
        Object.assign(queryBuilder(), filterBuilder())
      )
      if (nestedResult.hasQuery()) {
        nested.query = nestedResult.getQuery()
      }
      if (nestedResult.hasFilter()) {
        nested.filter = nestedResult.getFilter()
      }
    }

    query = boolMerge(
      {[queryType]: Object.assign(buildClause(...args), nested)},
      query,
      boolType
    )
  }

  return {
    query (...args) {
      makeQuery('and', ...args)
      return this
    },
    andQuery (...args) {
      return this.query(...args)
    },
    addQuery (...args) {
      return this.query(...args)
    },
    orQuery (...args) {
      makeQuery('or', ...args)
      return this
    },
    notQuery (...args) {
      makeQuery('not', ...args)
      return this
    },
    getQuery () {
      return query
    },
    hasQuery () {
      return !!_.size(query)
    }
  }
}

function filterBuilder () {
  let filter = {}

  function makeFilter (boolType, filterType, ...args) {
    const nested = {}
    if (_.isFunction(_.last(args))) {
      const nestedCallback = args.pop()
      const nestedResult = nestedCallback(
        Object.assign(queryBuilder(), filterBuilder(), aggregationBuilder())
      )
      if (nestedResult.hasQuery()) {
        nested.query = nestedResult.getQuery()
      }
      if (nestedResult.hasFilter()) {
        nested.filter = nestedResult.getFilter()
      }
      if (nestedResult.hasAggregations()) {
        nested.aggs = nestedResult.getAggregations()
      }
    }

    filter = boolMerge(
      {[filterType]: Object.assign(buildClause(...args), nested)},
      filter,
      boolType
    )
  }

  return {
    filter (...args) {
      makeFilter('and', ...args)
      return this
    },
    andFilter (...args) {
      return this.filter(...args)
    },
    addFilter (...args) {
      return this.filter(...args)
    },
    orFilter (...args) {
      makeFilter('or', ...args)
      return this
    },
    notFilter (...args) {
      makeFilter('not', ...args)
      return this
    },
    getFilter () {
      return filter
    },
    hasFilter () {
      return !!_.size(filter)
    }
  }
}

function buildAggregation (type, field, opts) {
  return {
    [type]: Object.assign({field}, opts)
  }
}

function aggregationBuilder () {
  const aggregations = {}

  function makeAggregation (type, field, ...args) {
    const aggName = _.find(args, _.isString) || `agg_${type}_${field}`
    const opts = _.find(args, _.isPlainObject) || {}
    const nested = _.find(args, _.isFunction)
    const nestedClause = {}

    if (_.isFunction(nested)) {
      const nestedResult = nested(Object.assign(
        {},
        aggregationBuilder(),
        filterBuilder()
      ))
      if (nestedResult.hasFilter()) {
        nestedClause.filter = nestedResult.getFilter()
      }
      if (nestedResult.hasAggregations()) {
        nestedClause.aggs = nestedResult.getAggregations()
      }
    }

    Object.assign(
      aggregations,
      {[aggName]: Object.assign(
        buildAggregation(type, field, opts),
        nestedClause
      )}
    )
  }

  return {
    aggregation (...args) {
      makeAggregation(...args)
      return this
    },
    agg (...args) {
      return this.aggregation(...args)
    },
    getAggregations () {
      return aggregations
    },
    hasAggregations () {
      return !!_.size(aggregations)
    }
  }
}

export {
  queryBuilder,
  bodyBuilder,
  filterBuilder,
  aggregationBuilder
}
