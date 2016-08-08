import {assign} from 'lodash';

/**
 * Construct a Multi Match query.
 *
 * @param  {Array}  fields  The field names to query over.
 * @param  {String} query   The query string.
 * @param  {String} [type='best_fields']  The type of multi_match query.
 * @param {Object} options see docs for possible options https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html
 * @return {Object}         Multi Match query.
 */
export default function multiMatchQuery(fields, query, type='best_fields', options={}) {
  return {
    multi_match: assign({
      query: query,
      type: type,
      fields: fields
    }, options)
  }
}
