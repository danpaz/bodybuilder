/**
 * Construct a Min aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_min_<field>.
 * @return {Object}       Min aggregation.
 */
export default function minAggregation(field, name) {
  name = name || `agg_min_${field}`
  return {
    [name]: {
      min: {
        field: field
      }
    }
  }
}
