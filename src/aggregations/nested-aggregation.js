/**
 * Construct a Nested aggregation.
 *
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-nested-aggregation.html|ES docs}
 *
 * @memberof Aggregations
 *
 * @param  {String} path   Path of the nested documents.
 * @param  {String} [name] Aggregation name. Defaults to agg_nested_<path>.
 * @return {Object}        Nested aggregation.
 */
export default function nestedAggregation (path, name) {

  name = name || `agg_nested_${path}`

  return {
    [name]: {
      nested: { path }
    }
  }
}
