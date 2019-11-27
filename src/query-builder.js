import _ from 'lodash'
import { toBool, pushQuery } from './utils'

export default function queryBuilder (options, newQuery) {
  const query = _.isEmpty(newQuery) ? {
    and: [],
    or: [],
    not: []
  } : newQuery

  const makeQuery = pushQuery.bind(options || {}, query)

  function addMinimumShouldMatch(str, override = false) {
    query.minimum_should_match = str
    query.minimum_should_match_override = override
  }

  return {
    /**
     * Add a query clause to the query body.
     *
     * @param  {string}        type    Query type.
     * @param  {string|Object} field   Field to query or complete query clause.
     * @param  {string|Object} value   Query term or inner clause.
     * @param  {Object}        options (optional) Additional options for the
     *                                 query clause.
     * @param  {Function}      [nest]  (optional) A function used to define
     *                                 sub-filters as children. This _must_ be
     *                                 the last argument.
     *
     * @return {bodybuilder} Builder.
     *
     * @example
     * bodybuilder()
     *   .query('match_all')
     *   .build()
     *
     * bodybuilder()
     *   .query('match_all', { boost: 1.2 })
     *   .build()
     *
     * bodybuilder()
     *   .query('match', 'message', 'this is a test')
     *   .build()
     *
     * bodybuilder()
     *   .query('terms', 'user', ['kimchy', 'elastic'])
     *   .build()
     *
     * bodybuilder()
     *   .query('nested', { path: 'obj1', score_mode: 'avg' }, (q) => {
     *     return q
     *       .query('match', 'obj1.name', 'blue')
     *       .query('range', 'obj1.count', {gt: 5})
     *   })
     *   .build()
     */
    query (...args) {
      makeQuery('and', ...args)
      return this
    },

    /**
     * Alias for `query`.
     *
     * @return {bodybuilder} Builder.
     */
    andQuery (...args) {
      return this.query(...args)
    },

    /**
     * Alias for `query`.
     *
     * @return {bodybuilder} Builder.
     */
    addQuery (...args) {
      return this.query(...args)
    },

    /**
     * Add a "should" query to the query body.
     *
     * Same arguments as `query`.
     *
     * @return {bodybuilder} Builder.
     */
    orQuery (...args) {
      makeQuery('or', ...args)
      return this
    },

    /**
     * Add a "must_not" query to the query body.
     *
     * Same arguments as `query`.
     *
     * @return {bodybuilder} Builder.
     */
    notQuery (...args) {
      makeQuery('not', ...args)
      return this
    },

    /**
     * Set the `minimum_should_match` property on a bool query with more than
     * one `should` clause.
     *
     * @param  {any} param  minimum_should_match parameter. For possible values
     *                      see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-minimum-should-match.html
     * @param {boolean} override  allows minimum_should_match to be overridden, ignoring internal constraints
     * @return {bodybuilder} Builder.
     */
    queryMinimumShouldMatch (param, override) {
      addMinimumShouldMatch(param, !!override)
      return this
    },

    getQuery () {
      return this.hasQuery() ? toBool(query) : {}
    },

    hasQuery () {
      return !!(query.and.length || query.or.length || query.not.length)
    },

    getRawQuery () {
      return query
    }
  }
}
