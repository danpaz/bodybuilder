/**
 * Construct a Global aggregation.
 *
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-global-aggregation.html|ES docs}
 *
 * @memberof Aggregations
 *
 * @param  {String} [name] Aggregation name. Defaults to agg_global.
 * @return {Object}        Global aggregation.
 */
export default function globalAggregation(name) {

  name = name || 'agg_global'

  return {
    [name]: {
      global: {}
    }
  }
}
