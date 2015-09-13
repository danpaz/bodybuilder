/**
 * Construct a Prefix filter.
 *
 * @param  {String} field      Field name to query over.
 * @param  {String} prefixTerm Query value.
 * @return {Object}            Prefix filter.
 */
export default function prefixFilter(field, prefixTerm) {
  return {
    prefix: {
      [field]: prefixTerm
    }
  }
}
