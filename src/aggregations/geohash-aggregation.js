import _ from 'lodash'

/**
 * Construct a Geohash grid aggregation.
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} opts  Additional options to include in the aggregation.
 * @param  {String} name  Aggregation name. Defaults to agg_histogram_<field>.
 * @return {Object}       Histogram Aggregation.
 */
export default function geohashAggregation(field, opts, name) {
  name = name || `agg_geohash_grid_${field}`
  return {
    [name]: {
      geohash_grid: (() => _.merge({field}, opts))()
    }
  }
}
