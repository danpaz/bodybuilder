import {assign} from 'lodash'

/**
 * Construct a Nested query.
 * https://www.elastic.co/guide/en/elasticsearch/guide/current/nested-query.html
 *
 * @private
 * @memberof Queries
 *
 * @param  {String} path      The nested object the query is referring to. See https://www.elastic.co/guide/en/elasticsearch/guide/current/nested-query.html#CO272-2
 * @param  {Object} query     Fully-formed query.
 * @param  {Object} opts      Right now, the only optional field is score_mode. See https://www.elastic.co/guide/en/elasticsearch/guide/current/nested-query.html#CO273-1 
 * @return {Object}           Nested query.
 */
export default function nestedQuery(path, nested_query, opts = {}) {
  return {
    nested: assign({
      path: path,
      query: nested_query
    }, opts)
  }
}