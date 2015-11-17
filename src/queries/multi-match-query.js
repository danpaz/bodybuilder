/**
 * Construct a Multi Match query.
 *
 * @param  {Array}  fields  The field names to query over.
 * @param  {String} query   The query string.
 * @return {Object}         Multi Match query.
 */
export default function multiMatchQuery(fields, query) {
  return {
    multi_match: {
      query: query,
      fields: fields
    }
  }
}
