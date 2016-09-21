import _ from 'lodash'

/**
 * Construct a Histogram aggregation.
 *
 * @param  {String} field  Field name to aggregate over.
 * @param  {String} [name] Aggregation name. Defaults to agg_histogram_<field>.
 * @param  {Object} opts   Additional options to include in the aggregation.
 * @return {Object}        Histogram Aggregation.
 */
export default function histogramAggregation(field, name, opts) {
  if (_.isObject(name)) {
    let tmp = opts
    opts = name
    name = tmp
  }

  name = name || `agg_histogram_${field}`

  return {
    [name]: {
      histogram: (() => _.merge({field}, opts))()
    }
  }
}
