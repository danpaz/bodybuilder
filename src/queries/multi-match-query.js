import {assign} from 'lodash'

const defaultOptions = {
  type: 'best_fields'
}

/**
 * Construct a Multi Match query. Default type is 'best_fields'.
 *
 * @memberof Queries
 *
 * @param  {Array}  fields  The field names to query over.
 * @param  {String} query   The query string.
 * @param  {Object} options See docs for possible options https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html
 * @return {Object}         Multi Match query.
 */
export default function multiMatchQuery(fields, query, options = defaultOptions) {
  if (typeof options === 'string') {
    options = {
      type: options
    }
  }
  options.type = options.type || defaultOptions.type

  return {
    multi_match: assign({
      query: query,
      fields: fields
    }, options)
  }
}
