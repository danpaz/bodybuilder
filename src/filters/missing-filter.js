/**
 * Construct a Missing filter.
 *
 * @param  {String} field Field name to query over.
 * @param  {String} term  Query value.
 * @return {Object}       Missing filter.
 */
export default function missingFilter(field, term) {
  return {
    missing: {
      [field]: term
    }
  }
}
