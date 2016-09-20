/**
 * Construct a Value Count aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_value_count_<field>.
 * @return {Object}       Value Count Aggregation.
 */
export default function valueCountAggregation(field, name) {
  name = name || `agg_value_count_${field}`
  return {
    [name]: {
      value_count: {
        field: field
      }
    }
  }
}
