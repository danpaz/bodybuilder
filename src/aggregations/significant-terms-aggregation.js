/**
 * Construct a Significant Terms aggregation.
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_significant_terms_<field>.
 * @return {Object}       Significant Terms aggregation.
 */
export default function significantTermsAggregation(field, name) {
  name = name || `agg_significant_terms_${field}`
  return {
    [name]: {
      significant_terms: {
        field: field
      }
    }
  }
}
