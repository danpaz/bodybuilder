/**
 * Construct a Match query.
 *
 * @param  {String} field Field name to query over.
 * @param  {String} term  Query value.
 * @return {Object}       Match query.
 */
export default function matchQuery(field, term) {
  return {
    match: {
      [field]: term
    }
  }
}
