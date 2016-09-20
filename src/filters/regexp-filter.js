/**
 * Construct a Regexp filter.
 *
 * @memberof Filters
 *
 * @param  {String} field  Field name to query over.
 * @param  {String} regexp Query value.
 * @return {Object}        Regexp filter.
 */
export default function regexpFilter(field, regexp) {
  return {
    regexp: {
      [field]: regexp
    }
  }
}
