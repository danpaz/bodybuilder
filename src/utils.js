import _ from 'lodash'
import queries from './queries'

/**
 * Extends lodash's assignWith by allowing array concatenation
 * and deep merging.
 *
 * @private
 *
 * @param {Object} target Target.
 * @returns {Object} Merged object.
 */
export function mergeConcat(target) {
  let args = Array.prototype.slice.call(arguments, 1)

  args.unshift(target)
  args.push(function customizer(a, b) {
    if (_.isPlainObject(a)) {
      return _.assignWith(a, b, customizer)
    } else if (_.isArray(a)) {
      return a.concat(b)
    } else {
      return b;
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
      return queries.bool(boolType, newObj)
    }
    return newObj
  }

  // Make bools out of the new and existing filters.
  boolCurrent = currentObj.bool ? currentObj : queries.bool('must', currentObj)
  boolNew = newObj.bool ? newObj : queries.bool(boolType, newObj)

  return mergeConcat({}, boolCurrent, boolNew)
}
