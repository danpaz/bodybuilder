/**
 * Construct a Max aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_max_<field>.
 * @return {Object}       Max aggregation.
 */
export default function maxAggregation(field, name) {
  name = name || `agg_max_${field}`
  return {
    [name]: {
      max: {
        field: field
      }
    }
  }
}
