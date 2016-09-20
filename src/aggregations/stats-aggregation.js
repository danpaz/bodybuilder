/**
 * Construct a Stats aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_stats_<field>.
 * @return {Object}       Stats Aggregation.
 */
export default function statsAggregation(field, name) {
  name = name || `agg_stats_${field}`
  return {
    [name]: {
      stats: {
        field: field
      }
    }
  }
}
