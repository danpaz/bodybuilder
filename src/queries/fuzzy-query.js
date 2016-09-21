/**
 * Construct a Fuzzy query.
 *
 * @memberof Queries
 *
 * @param  {String} field Field name to query over.
 * @param  {String} term  Query value.
 * @return {Object}       Fuzzy query.
 */
export default function fuzzyQuery(field, term) {
  return {
    fuzzy: {
      [field]: term
    }
  }
}
