import isPlainObject from 'lodash.isplainobject'
import isObject from 'lodash.isobject'
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

  if (isPlainObject(value)) {
    payload = { [field]: Object.assign({}, value) }
  } else {
    payload = { [field]: { order: value } }
  }

  const idx = current.findIndex(function (o) {
    return o[field] != undefined
  })

  if (isPlainObject(value) || idx === -1) {
    current.push(payload)
  } else {
    Object.assign(current[idx], payload)
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
  const hasField = field != null
  const hasValue = value != null
  let mainClause = {}

  if (hasValue) {
    mainClause = {[field]: value}
  } else if (isObject(field)) {
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
  return arr.length > 1 ? arr : arr.slice(-1)[0]
}

export function isFunction (func) {
  if (func && typeof func === "function") {
    return true
  }
  return false
}

export function has (obj, key) {
  var keyParts = key.split('.')

  return !!obj && (
    keyParts.length > 1
      ? has(obj[key.split('.')[0]], keyParts.slice(1).join('.'))
      : hasOwnProperty.call(obj, key)
  )
}

export function pushQuery (existing, boolKey, type, ...args) {
  const nested = {}
  if (isFunction(args.slice(-1)[0])) {
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
    ['bool', 'constant_score'].includes(type) &&
    this.isInFilterContext &&
    has(nested, 'filter.bool')
  ) {
    // nesting filters: We've introduced an unnecessary `filter.bool`
    existing[boolKey].push(
      {[type]: Object.assign(buildClause(...args), nested.filter.bool)}
    )
  } else if (
    type === 'bool' &&
    has(nested, 'query.bool')
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

export const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length

export function isString (str) {
  if (str && typeof str.valueOf() === "string") {
    return true
  }
  return false
}

/**
 * Util to replace lodash.set, sets the value of an object
 *
 * @private
 *
 * @param  {Object} obj Object to set value in
 * @param  {string|Object} path Path in the object where to set the value
 * @param  {Object} value  Value to set
 *
 * @return {Object} undefined
 */
export function set(obj, path, value) {
  const keys = Array.isArray(path) ? path : path.replace(/\[/g, '.').replace(/\]/g, '').split('.') // removes array reference and convert path to array if it's a string

  const lastKeyIndex = keys.length - 1

  for (let i = 0; i < lastKeyIndex; i++) {
    const key = keys[i]
    if (!(key in obj)) {
      obj[key] = {}
    }
    obj = obj[key]
  }

  obj[keys[lastKeyIndex]] = value
}