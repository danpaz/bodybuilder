import _ from 'lodash'

/**
 * Construct a Terms aggregation.
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_terms_<field>.
 * @param  {Object} opts  Additional options to include in the aggregation.
 * @return {Object}       Terms aggregation.
 */
export default function termsAggregation(field, name, opts) {
  name = name || `agg_terms_${field}`
  return {
    [name]: {
      terms: (() => _.assign({field}, opts))()
    }
  }
}
