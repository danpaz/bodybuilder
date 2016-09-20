/**
 * Construct a Fuzzy filter.
 *
 * @memberof Filters
 *
 * @param  {String} field  Field name to query over.
 * @param  {String} term Query value.
 * @return {Object}        Fuzzy filter.
 */
export default function fuzzyFilter(field, term) {
  return {
    fuzzy: {
      [field]: term
    }
  }
}
