/**
 * Construct a Terms query.
 *
 * @memberof Queries
 *
 * @param  {String}  field       Field name to query over.
 * @param  {Array}   terms       Array of query terms.
 * @return {Object}              Terms query.
 */
export default function termsQuery(field, terms) {
  return {
    terms: {
      [field]: terms
    }
  }
}
