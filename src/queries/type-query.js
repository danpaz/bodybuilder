/**
 * Construct a Type query.
 *
 * @memberof Queries
 *
 * @param  {String} type  Type value.
 * @return {Object}       Type query.
 */
export default function typeQuery(type) {
  return {
    type: {
      value: type
    }
  }
}
