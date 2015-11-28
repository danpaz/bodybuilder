/**
 * Construct a Terms aggregation.
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_terms_<field>.
 * @return {Object}       Terms aggregation.
 */
export default function termsAggregation(field, name) {
  name = name || `agg_terms_${field}`
  return {
    [name]: {
      terms: {
        field: field
      }
    }
  }
}
