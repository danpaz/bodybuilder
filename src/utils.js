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

  if (_.isPlainObject(value) || idx === -1) {
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
    (unwrapped.minimum_should_match &&
    filters.or.length > 1) || filters.minimum_should_match_override
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

export function pushQuery (existing, boolKey, type, ...args) {
  const nested = {}
  if (_.isFunction(_.last(args))) {
    const nestedCallback = args.pop()
    const nestedResult = nestedCallback(
      Object.assign(
        {},
        filterBuilder({ isInFilterContext: this.isInFilterContext }),
        this.isInFilterContext
          ? {}
          : queryBuilder({ isInFilterContext: this.isInFilterContext })
      )
    )
    if (!this.isInFilterContext && nestedResult.hasQuery()) {
      nested.query = nestedResult.getQuery()
    }
    if (nestedResult.hasFilter()) {
      nested.filter = nestedResult.getFilter()
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
  } else if (
    type === 'bool' &&
    _.has(nested, 'query.bool')
   ) {
    existing[boolKey].push(
      {[type]: Object.assign(buildClause(...args), nested.query.bool)}
    )
    } else {
    // Usual case
    existing[boolKey].push(
      {[type]: Object.assign(buildClause(...args), nested)}
    )
  }
}
