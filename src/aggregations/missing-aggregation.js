/**
 * Construct a Missing aggregation.
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_missing_<field>.
 * @return {Object}       Missing Aggregation.
 */
export default function missingAggregation(field, name) {
  name = name || `agg_missing_${field}`
  return {
    [name]: {
      missing: {
        field: field
      }
    }
  }
}
