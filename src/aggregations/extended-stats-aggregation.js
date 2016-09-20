/**
 * Construct a Extended Stats aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_extended_stats_<field>.
 * @return {Object}       Extended Stats Aggregation.
 */
export default function extendedStatsAggregation(field, name) {
  name = name || `agg_extended_stats_${field}`
  return {
    [name]: {
      extended_stats: {
        field: field
      }
    }
  }
}
