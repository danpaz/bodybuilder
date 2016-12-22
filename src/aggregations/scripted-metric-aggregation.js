import _ from 'lodash'

/**
 * Construct a Scripted Metric aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} map_script The script as a string associated to the map_script step.
 * @param  {String} [name] Aggregation name. Defaults to agg_scripted_metric.
 * @param  {Object} opts   Additional options to include in the aggregation.
 * @return {Object}        Scripted Metric aggregation.
 */
export default function scriptedMetricAggregation(map_script, name, opts) {
  if (_.isObject(name)) {
    let tmp = opts
    opts = name
    name = tmp
  }

  name = name || `agg_scripted_metric`

  return {
    [name]: {
      scripted_metric: (() => _.merge({map_script}, opts))()
    }
  }
}
