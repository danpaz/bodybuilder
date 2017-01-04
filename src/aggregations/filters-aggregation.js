import _ from 'lodash'
import FiltersBuilder from '../filters/filters-builder'

/**
 * Construct a Filters aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} filterCb Callback function that will be passed the
 *                           FiltersBuilder
 * @param  {String} name     Aggregation name. Defaults to agg_filter.
 * @param  {Object} opts     Additional options to include in the aggregation.
 * @return {Object}          Filter Aggregation.
 */
export default function filtersAggregation(filterCb, name, opts) {
  if (_.isObject(name)) {
    const tmp = opts
    opts = name
    name = tmp
  }

  name = name || `agg_filters`

  const filtersBuilder = new FiltersBuilder()

  filterCb(filtersBuilder)

  return {
    [name]: {
      filters: {
        filters: filtersBuilder.filters
      }
    }
  }
}
