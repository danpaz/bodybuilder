/**
 * Construct a Sum aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_sum_<field>.
 * @return {Object}       Sum Aggregation.
 */
export default function sumAggregation(field, name) {
  name = name || `agg_sum_${field}`
  return {
    [name]: {
      sum: {
        field: field
      }
    }
  }
}
