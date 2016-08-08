import {assign} from 'lodash';

/**
 * Construct a Query String query.
 *
 * @param  {Array}  fields  The field names to query over.
 * @param  {String} term  Query value.
 * @param {Object} options See docs for possible options https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html
 * @return {Object}       Query String query.
 */
export default function queryStringQuery(fields, term, options={}) {
  const query = Array.isArray(fields) ? term : fields
  fields = Array.isArray(fields) ? fields : []
  const queryString = {
    query_string: {
      query
    }
  }

  if (fields.length > 0) queryString.query_string.fields = fields
  queryString.query_string = assign(queryString.query_string, options);

  return queryString;
}
