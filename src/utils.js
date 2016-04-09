import _ from 'lodash'
import queries from './queries'

/**
 * Extends lodash's merge by allowing array concatenation.
 *
 * @private
 *
 * @param {Object} target Target.
 * @returns {Object} Merged object.
 */
export function mergeConcat(target) {
  var output = Object(target)
  for (var index = 1; index < arguments.length; index++) {
    var source = arguments[index]
    if (source !== undefined && source !== null) {
      for (var nextKey in source) {
        if (source.hasOwnProperty(nextKey)) {
           if (_.isPlainObject(output[nextKey])) {
            output[nextKey] = mergeConcat(output[nextKey], source[nextKey])
          } else if (_.isArray(output[nextKey])) {
            output[nextKey] = output[nextKey].concat(source[nextKey])
          } else {
            output[nextKey] = source[nextKey]
          }
        }
      }
    }
  }
  return output;
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
