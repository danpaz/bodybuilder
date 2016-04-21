/**
 * Construct a Multi Match query.
 *
 * @param  {Array}  fields  The field names to query over.
 * @param  {String} query   The query string.
 * @param  {String} type    The type of multi_match query (optional).
 * @return {Object}         Multi Match query.
 */
export default function multiMatchQuery(fields, query, type='best_fields') {
  return {
    multi_match: {
      query: query,
      type: type,
      fields: fields
    }
  }
}
