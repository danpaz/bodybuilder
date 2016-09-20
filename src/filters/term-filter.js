/**
 * Construct a Term filter.
 *
 * @memberof Filters
 *
 * @param  {String} field Field name to query over.
 * @param  {String} term  Query value.
 * @return {Object}       Term filter.
 */
export default function termFilter(field, term) {
  return {
    term: {
      [field]: term
    }
  }
}
