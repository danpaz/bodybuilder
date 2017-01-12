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
    /**
     * Add a filter clause to the query body.
     *
     * @param  {string}        type    Filter type.
     * @param  {string|Object} field   Field to filter or complete filter
     *                                 clause.
     * @param  {string|Object} value   Filter term or inner clause.
     * @param  {Object}        options (optional) Additional options for the
     *                                 filter clause.
     * @param  {Function}      [nest]  (optional) A function used to define
     *                                 sub-filters as children. This _must_ be
     *                                 the last argument.
     *
     * @return {bodybuilder} Builder.
     *
     * @example
     * bodybuilder()
     *   .filter('term', 'user', 'kimchy')
     *   .build()
     */
    filter (...args) {
      makeFilter('and', ...args)
      return this
    },

    /**
     * Alias for `filter`.
     *
     * @return {bodybuilder} Builder.
     */
    andFilter (...args) {
      return this.filter(...args)
    },

    /**
     * Alias for `filter`.
     *
     * @return {bodybuilder} Builder.
     */
    addFilter (...args) {
      return this.filter(...args)
    },

    /**
     * Add a "should" filter to the query body.
     *
     * Same arguments as `filter`.
     *
     * @return {bodybuilder} Builder.
     */
    orFilter (...args) {
      makeFilter('or', ...args)
      return this
    },

    /**
     * Add a "must_not" filter to the query body.
     *
     * Same arguments as `filter`.
     *
     * @return {bodybuilder} Builder.
     */
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
