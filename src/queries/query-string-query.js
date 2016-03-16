/**
 * Construct a Query String query.
 *
 * @param  {Array}  fields  The field names to query over.
 * @param  {String} term  Query value.
 * @return {Object}       Query String query.
 */
export default function queryStringQuery(fields, term) {
  let query = Array.isArray(fields) ? term : fields
  fields = Array.isArray(fields) ? fields : []
  let queryString = {
    query_string: {
      query
    }
  }

  if (fields.length > 0) queryString.query_string.fields = fields;

  return queryString;
}
