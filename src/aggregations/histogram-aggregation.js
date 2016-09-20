import _ from 'lodash'

/**
 * Construct a Histogram aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} opts  Additional options to include in the aggregation.
 * @param  {String} name  Aggregation name. Defaults to agg_histogram_<field>.
 * @return {Object}       Histogram Aggregation.
 */
export default function histogramAggregation(field, opts, name) {
  name = name || `agg_histogram_${field}`
  return {
    [name]: {
      histogram: (() => _.merge({field}, opts))()
    }
  }
}
