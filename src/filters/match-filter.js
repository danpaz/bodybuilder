/**
 * Construct a Match filter.
 *
 * @memberof Filters
 *
 * @param  {String} field  Field name to query over.
 * @param  {String} term Query value.
 * @return {Object}        Match filter.
 */
export default function matchFilter(field, term) {
  return {
    match: {
      [field]: term
    }
  }
}
