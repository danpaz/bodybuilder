import _ from 'lodash'
import { buildAggregation } from './utils'
import filterBuilder from './filter-builder'

export default function aggregationBuilder () {
  let aggregations = {}

  function makeAggregation (type, field, ...args) {
    const aggName = _.find(args, _.isString) || `agg_${type}_${field}`
    const opts = _.find(args, _.isPlainObject) || {}
    const nested = _.find(args, _.isFunction)
    const nestedClause = {}

    if (_.isFunction(nested)) {
      const nestedResult = nested(Object.assign(
        {},
        aggregationBuilder(),
        filterBuilder()
      ))
      if (nestedResult.hasFilter()) {
        nestedClause.filter = nestedResult.getFilter()
      }
      if (nestedResult.hasAggregations()) {
        nestedClause.aggs = nestedResult.getAggregations()
      }
    }

    Object.assign(
      aggregations,
      {[aggName]: Object.assign(
        buildAggregation(type, field, opts),
        nestedClause
      )}
    )
  }

  return {
    aggregation (...args) {
      makeAggregation(...args)
      return this
    },
    agg (...args) {
      return this.aggregation(...args)
    },
    getAggregations () {
      return aggregations
    },
    hasAggregations () {
      return !!_.size(aggregations)
    }
  }
}
