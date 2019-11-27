import _ from 'lodash'
import { pushQuery, toBool } from './utils'

export default function filterBuilder (options, newFilters) {
  const filters = _.isEmpty(newFilters) ? {
    and: [],
    or: [],
    not: []
  } : newFilters

  const makeFilter = pushQuery.bind(
    Object.assign({ isInFilterContext: true }, options),
    filters
  )

  function addMinimumShouldMatch(str, override) {
    filters.minimum_should_match = str
    filters.minimum_should_match_override = override
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

    /**
     * Set the `minimum_should_match` property on a bool filter with more than
     * one `should` clause.
     *
     * @param  {any} param  minimum_should_match parameter. For possible values
     *                      see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-minimum-should-match.html
     * @param {boolean} override  allows minimum_should_match to be overridden, ignoring internal constraints
     * @return {bodybuilder} Builder.
     */
    filterMinimumShouldMatch (param, override) {
      addMinimumShouldMatch(param, !!override)
      return this
    },

    getFilter () {
      return this.hasFilter() ? toBool(filters) : {}
    },

    hasFilter () {
      return !!(filters.and.length || filters.or.length || filters.not.length)
    },

    getRawFilter () {
      return filters
    }
  }
}
