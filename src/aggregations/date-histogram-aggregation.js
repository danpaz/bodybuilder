import _ from 'lodash'

/**
 * Construct a Date Histogram aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field  Field name to aggregate over.
 * @param  {String} [name] Aggregation name. Defaults to agg_date_histogram_<field>.
 * @param  {Object} opts   Additional options to include in the aggregation.
 * @return {Object}        Date Histogram Aggregation.
 */
export default function dateHistogramAggregation(field, name, opts) {
  if (_.isObject(name)) {
    let tmp = opts
    opts = name
    name = tmp
  }

  name = name || `agg_date_histogram_${field}`

  return {
    [name]: {
      date_histogram: (() => _.merge({field}, opts))()
    }
  }
}
