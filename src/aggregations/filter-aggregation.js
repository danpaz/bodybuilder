import _ from 'lodash'
import FilterBuilder from '../filters/filter-builder'

/**
 * Construct a Filter aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} filterCb Callback function that will be passed the
 *                           FilterBuilder
 * @param  {String} name     Aggregation name. Defaults to agg_filter.
 * @param  {Object} opts     Additional options to include in the aggregation.
 * @return {Object}          Filter Aggregation.
 */
export default function filterAggregation(filterCb, name, opts) {
  if (_.isObject(name)) {
    const tmp = opts
    opts = name
    name = tmp
  }

  name = name || `agg_filter`

  const filterBuilder = new FilterBuilder()

  filterCb(filterBuilder)

  return {
    [name]: {
      filter: filterBuilder.filters
    }
  }
}
