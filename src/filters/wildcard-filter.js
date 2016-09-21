/**
 * Construct a Wildcard filter.
 *
 * @memberof Filters
 *
 * @param  {String} field  Field name to query over.
 * @param  {String} regexp Query value.
 * @return {Object}        Wildcard filter.
 */
export default function wildcardFilter(field, regexp) {
  return {
    wildcard: {
      [field]: regexp
    }
  }
}
