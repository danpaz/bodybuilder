import _ from 'lodash'

/**
 * Construct a Significant Terms aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field  Field name to aggregate over.
 * @param  {String} [name] Aggregation name. Defaults to agg_significant_terms_<field>.
 * @param  {Object} opts   Additional options to include in the aggregation.
 * @return {Object}        Significant Terms aggregation.
 */
export default function significantTermsAggregation(field, name, opts) {
  if (_.isObject(name)) {
    let tmp = opts
    opts = name
    name = tmp
  }

  name = name || `agg_significant_terms_${field}`

  return {
    [name]: {
      significant_terms: (() => _.merge({field}, opts))()
    }
  }
}
