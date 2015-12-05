/**
 * Construct a Type filter.
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
