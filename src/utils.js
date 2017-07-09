import _ from 'lodash'
import queryBuilder from './query-builder'
import filterBuilder from './filter-builder'

/**
 * Compound sort function into the list of sorts
 *
 * @private
 *
 * @param  {Array} current Array of Elasticsearch sorts.
 * @param  {String} field Field to sort.
 * @param  {String|Object} value A valid direction ('asc', 'desc') or object with sort options
 * @returns {Array} Array of Elasticsearch sorts.
 */
export function sortMerge(current, field, value) {
  let payload

  if (_.isPlainObject(value)) {
    payload = { [field]: _.assign({}, value) }
  } else {
    payload = { [field]: { order: value } }
  }

  const idx = _.findIndex(current, function (o) {
    return o[field] != undefined
  })

  if (idx == -1) {
    current.push(payload)
  } else {
    _.extend(current[idx], payload)
  }

  return current
}

/**
 * Generic builder for query, filter, or aggregation clauses.
 *
 * @private
 *
 * @param  {string|Object} field Field name or complete clause.
 * @param  {string|Object} value Field value or inner clause.
 * @param  {Object}        opts  Additional key-value pairs.
 *
 * @return {Object} Clause
 */
export function buildClause (field, value, opts) {
  const hasField = !_.isNil(field)
  const hasValue = !_.isNil(value)
  let mainClause = {}

  if (hasValue) {
    mainClause = {[field]: value}
  } else if (_.isObject(field)) {
    mainClause = field
  } else if (hasField) {
    mainClause = {field}
  }

  return Object.assign({}, mainClause, opts)
}

export function toBool (filters) {
  const unwrapped = {
    must: unwrap(filters.and),
    should: unwrap(filters.or),
    must_not: unwrap(filters.not),
    minimum_should_match: filters.minimum_should_match
  }

  if (
    filters.and.length === 1 &&
    !unwrapped.should &&
    !unwrapped.must_not
  ) {
    return unwrapped.must
  }

  const cleaned = {}

  if (unwrapped.must) {
    cleaned.must = unwrapped.must
  }
  if (unwrapped.should) {
    cleaned.should = filters.or
  }
  if (unwrapped.must_not) {
    cleaned.must_not = filters.not
  }
  if (
    unwrapped.minimum_should_match &&
    filters.or.length > 1
  ) {
    cleaned.minimum_should_match = unwrapped.minimum_should_match
  }

  return {
    bool: cleaned
  }
}

function unwrap (arr) {
  return arr.length > 1 ? arr : _.last(arr)
}

const nestedTypes = ['nested', 'has_parent', 'has_child']

export function pushQuery (existing, boolKey, type, ...args) {
  const nested = {}
  if (_.isFunction(_.last(args))) {
    const isNestedType = _.includes(nestedTypes, _.snakeCase(type))
    const nestedCallback = args.pop()
    // It is illogical to add a query nested inside a filter, because its
    // scoring won't be taken into account by elasticsearch. However we do need
    // to provide the `query` methods in the context of joined queries for
    // backwards compatability.
    const nestedResult = nestedCallback(
      Object.assign(
        {},
        filterBuilder({ isInFilterContext: this.isInFilterContext }),
        (this.isInFilterContext && !isNestedType)
          ? {}
          : queryBuilder({ isInFilterContext: this.isInFilterContext })
      )
    )
    if (isNestedType) {
      nested.query = build(
        {},
        nestedResult.getQuery(),
        nestedResult.getFilter()
      ).query
    } else {
      if (!this.isInFilterContext && nestedResult.hasQuery()) {
        nested.must = nestedResult.getQuery()
      }
      if (nestedResult.hasFilter()) {
        nested.filter = nestedResult.getFilter()
      }
    }
  }

  if (
    _.includes(['bool', 'constant_score'], type) &&
    this.isInFilterContext &&
    _.has(nested, 'filter.bool')
  ) {
    // nesting filters: We've introduced an unnecessary `filter.bool`
    existing[boolKey].push(
      {[type]: Object.assign(buildClause(...args), nested.filter.bool)}
    )
  } else {
    // Usual case
    existing[boolKey].push(
      {[type]: Object.assign(buildClause(...args), nested)}
    )
  }
}

export function buildV1(body, queries, filters, aggregations) {
  let clonedBody = _.cloneDeep(body)

  if (!_.isEmpty(filters)) {
    _.set(clonedBody, 'query.filtered.filter', filters)

    if (!_.isEmpty(queries)) {
      _.set(clonedBody, 'query.filtered.query', queries)
    }

  } else if (!_.isEmpty(queries)) {
    _.set(clonedBody, 'query', queries)
  }

  if (!_.isEmpty(aggregations)) {
    _.set(clonedBody, 'aggregations', aggregations)
  }
  return clonedBody
}

export function build(body, queries, filters, aggregations) {
  let clonedBody = _.cloneDeep(body)

  if (!_.isEmpty(filters)) {
    let filterBody = {}
    let queryBody = {}
    _.set(filterBody, 'query.bool.filter', filters)
    if (!_.isEmpty(queries.bool)) {
      _.set(queryBody, 'query.bool', queries.bool)
    } else if (!_.isEmpty(queries)) {
      _.set(queryBody, 'query.bool.must', queries)
    }
    _.merge(clonedBody, filterBody, queryBody)
  } else if (!_.isEmpty(queries)) {
    _.set(clonedBody, 'query', queries)
  }

  if (!_.isEmpty(aggregations)) {
    _.set(clonedBody, 'aggs', aggregations)
  }

  return clonedBody
}
