import _ from 'lodash'
import { buildClause } from './utils'
import queryBuilder from './query-builder'
import aggregationBuilder from './aggregation-builder'

export default function filterBuilder () {
  let filters = {
    and: [],
    or: [],
    not: []
  }

  function addMinimumShouldMatch(str) {
    filters.minimum_should_match = str
  }

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

    filters[boolType].push(
      {[filterType]: Object.assign(buildClause(...args), nested)}
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

    /**
     * Set the `minimum_should_match` property on a bool filter with more than
     * one `should` clause.
     *
     * @param  {any} param  minimum_should_match parameter. For possible values
     *                      see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-minimum-should-match.html
     * @return {bodybuilder} Builder.
     */
    filterMinimumShouldMatch (param) {
      addMinimumShouldMatch(param)
      return this
    },

    getFilter () {
      return this.hasFilter() ? toBool(filters) : {}
    },

    hasFilter () {
      return !!(filters.and.length || filters.or.length || filters.not.length)
    }
  }
}

function toBool (filters) {
  const unwrapped = {
    must: unwrap(filters.and),
    should: unwrap(filters.or),
    must_not: unwrap(filters.not),
    minimum_should_match: filters.minimum_should_match
  }

  if (
    filters.and.length === 1 &&
    !unwrapped.should &&
    !unwrapped.must_not
  ) {
    return unwrapped.must
  }

  const cleaned = {}

  if (unwrapped.must) {
    cleaned.must = unwrapped.must
  }
  if (unwrapped.should) {
    cleaned.should = filters.or
  }
  if (unwrapped.must_not) {
    cleaned.must_not = filters.not
  }
  if (unwrapped.minimum_should_match) {
    cleaned.minimum_should_match = unwrapped.minimum_should_match
  }

  return {
    bool: cleaned
  }
}

function unwrap (arr) {
  return arr.length > 1 ? arr : _.last(arr)
}
