/**
 * Construct a Type filter.
 *
 * @memberof Filters
 *
 * @param  {String} type  Query value.
 * @return {Object}       Type filter.
 */
export default function typeFilter(type) {
  return {
    type: {
      value: type
    }
  }
}
