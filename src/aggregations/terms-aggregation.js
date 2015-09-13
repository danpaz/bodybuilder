/**
 * Construct a Terms aggregation.
 *
 * @param  {String} field Field name to query over.
 * @param  {String} name  Aggregation name. Defaults to agg_<field>.
 * @return {Object}       Terms filter.
 */
export default function termsAggregation(field, name) {
  name = name || `agg_${field}`
  return {
    [name]: {
      terms: {
        field: field
      }
    }
  }
}
