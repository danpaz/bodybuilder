/**
 * Construct a Avg aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_avg_<field>.
 * @return {Object}       Avg Aggregation.
 */
export default function avgAggregation(field, name) {
  name = name || `agg_avg_${field}`
  return {
    [name]: {
      avg: {
        field: field
      }
    }
  }
}
