import _ from 'lodash'
import boolQuery from './bool-query'

/**
 * Extends lodash's assignWith by allowing array concatenation
 * and deep merging.
 *
 * @private
 *
 * @param {Object} target Target.
 * @returns {Object} Merged object.
 */
export function mergeConcat() {
  let args = Array.prototype.slice.call(arguments, 0)
  args.push(function customizer(a, b) {
    if (_.isPlainObject(a)) {
      return _.assignWith(a, b, customizer)
    } else if (_.isArray(a)) {
      return a.concat(b)
    } else {
      return b
    }
  })
  return _.assignWith.apply(null, args)
}

/**
 * Merge two filters or queries using their Boolean counterparts.
 *
 * @private
 *
 * @param  {Object} newObj      New filter or query to add.
 * @param  {Object} currentObj  Old filter or query to merge into.
 * @param  {String} boolType    Type of boolean ('and', 'or', 'not').
 * @returns {Object} Combined filter or query.
 */
export function boolMerge(newObj, currentObj, boolType = 'and') {
  let boolCurrent
  let boolNew

  // Only one, no need for bool.
  if (_.isEmpty(currentObj)) {
    // Allow starting with 'or' and 'not' queries.
    if (boolType !== 'and') {
      return boolQuery(boolType, newObj)
    }
    return newObj
  }

  // Make bools out of the new and existing filters.
  boolCurrent = currentObj.bool ? currentObj : boolQuery('must', currentObj)
  boolNew = newObj.bool ? newObj : boolQuery(boolType, newObj)

  return mergeConcat({}, boolCurrent, boolNew)
}

/**
 * Compound sort function into the list of sorts
 *
 * @private
 *
 * @param  {Array} current      Array of elasticsearch sorts
 * @param  {String} field             Field name.
 * @param  {String} [direction='asc'] A valid direction: 'asc' or 'desc'.
 * @returns {Array} Array of elasticsearch sorts.
 */
export function sortMerge(current, field, direction) {
  var payload = {[field]: {order: direction.order || direction }}

  var idx = _.findIndex(current, function (o) {
    return o[field] != undefined
  })

  if(idx == -1) {
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
