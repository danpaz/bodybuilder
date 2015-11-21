import _ from 'lodash'
import filters from './filters'
import queries from './queries'

/**
 * Extends lodash's merge by allowing array concatenation.
 */
export function mergeConcat(target) {
  let args = Array.prototype.slice.call(arguments, 1)

  args.unshift(target)
  args.push(function concatArray(a, b) {
    if (Array.isArray(a)) {
      return a.concat(b)
    }
  })

  return _.merge.apply(null, args)
}

/**
 * Merge two filters or queries using their Boolean counterparts.
 *
 * @param  {String} type        Either 'filter' or 'query'.
 * @param  {Object} newObj      New filter or query to add.
 * @param  {Object} currentObj  Old filter or query to merge into.
 * @param  {String} bool        Type of boolean ('and', 'or', 'not').
 * @return {Object}             Combined filter or query.
 */
export function boolMerge(type, newObj, currentObj, bool = 'and') {
  let typeClass = type === 'query' ? queries : filters
  let boolCurrent
  let boolNew

  // Only one, no need for bool.
  //
  if (!currentObj) {
    return newObj
  }

  boolNew = typeClass.bool(bool, newObj)

  // We have a single existing non-bool. Make it a bool for merging with new.
  //
  if (!currentObj.bool) {
    boolCurrent = typeClass.bool(bool, currentObj)
    return mergeConcat({}, boolCurrent, boolNew)
  }

  // We have multiple existing bools. Now merge with new.
  //
  return mergeConcat({}, currentObj, boolNew)
}
