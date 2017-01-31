import _ from 'lodash'
import { boolMerge, buildClause } from './utils'
import queryBuilder from './query-builder'
import aggregationBuilder from './aggregation-builder'

export default function filterBuilder () {
  let filter = {}

  function makeFilter (boolType, filterType, ...args) {
    const nested = {}
    if (_.isFunction(_.last(args))) {
      const nestedCallback = args.pop()
      const nestedResult = nestedCallback(
        Object.assign(
          {},
          queryBuilder(),
          filterBuilder(),
          aggregationBuilder()
        )
      )
      if (nestedResult.hasQuery()) {
        nested.query = nestedResult.getQuery()
      }
      if (nestedResult.hasFilter()) {
        nested.filter = nestedResult.getFilter()
      }
      if (nestedResult.hasAggregations()) {
        nested.aggs = nestedResult.getAggregations()
      }
    }

    filter = boolMerge(
      {[filterType]: Object.assign(buildClause(...args), nested)},
      filter,
      boolType
    )
  }

  return {
    filter (...args) {
      makeFilter('and', ...args)
      return this
    },
    andFilter (...args) {
      return this.filter(...args)
    },
    addFilter (...args) {
      return this.filter(...args)
    },
    orFilter (...args) {
      makeFilter('or', ...args)
      return this
    },
    notFilter (...args) {
      makeFilter('not', ...args)
      return this
    },
    getFilter () {
      return filter
    },
    hasFilter () {
      return !!_.size(filter)
    }
  }
}
