/**
 * Construct a Wildcard filter.
 *
 * @param  {String} field  Field name to query over.
 * @param  {String} term Query value.
 * @return {Object}        Wildcard filter.
 */
export default function wildcardFilter(field, term) {
  return {
    wildcard: {
      [field]: term
    }
  }
}
