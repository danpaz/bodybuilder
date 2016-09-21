/**
 * Construct a Terms filter.
 *
 * @memberof Filters
 *
 * @param  {String} field Field name to query over.
 * @param  {Array}  terms Array of query terms.
 * @return {Object}       Terms filter.
 */
export default function termsFilter(field, terms) {
  return {
    terms: {
      [field]: terms
    }
  }
}
