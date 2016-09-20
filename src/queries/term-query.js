/**
 * Construct a Term query.
 *
 * @memberof Queries
 *
 * @param  {String} field Field name to query over.
 * @param  {String} term  Query value.
 * @return {Object}       Term query.
 */
export default function termQuery(field, term) {
  return {
    term: {
      [field]: term
    }
  }
}
