/**
 * Construct a Query String query.
 *
 * @param  {String} term  Query value.
 * @return {Object}       Query String query.
 */
export default function queryStringQuery(term) {
  return {
    query_string: {
      query: term
    }
  }
}
