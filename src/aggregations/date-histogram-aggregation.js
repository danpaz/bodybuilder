import _ from 'lodash'

/**
 * Construct a Date Histogram aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} opts  Additional options to include in the aggregation.
 * @param  {String} name  Aggregation name. Defaults to agg_date_histogram_<field>.
 * @return {Object}       Date Histogram Aggregation.
 */
export default function dateHistogramAggregation(field, opts, name) {
  name = name || `agg_date_histogram_${field}`
  return {
    [name]: {
      date_histogram: (() => _.merge({field}, opts))()
    }
  }
}
