import _ from 'lodash'
import { boolMerge, buildClause } from './utils'
import filterBuilder from './filter-builder'

export default function queryBuilder () {
  let query = {}

  function addMinimumShouldMatch(str) {
    const shouldClause = _.get(query, 'bool.should')
    if (shouldClause && shouldClause.length > 1) {
      query.bool['minimum_should_match'] = str
    }
  }

  function makeQuery (boolType, queryType, ...args) {
    const nested = {}
    if (_.isFunction(_.last(args))) {
      const nestedCallback = args.pop()
      const nestedResult = nestedCallback(
        Object.assign(
          {},
          queryBuilder(),
          filterBuilder()
        )
      )
      if (nestedResult.hasQuery()) {
        nested.query = nestedResult.getQuery()
      }
      if (nestedResult.hasFilter()) {
        nested.filter = nestedResult.getFilter()
      }
    }

    query = boolMerge(
      {[queryType]: Object.assign(buildClause(...args), nested)},
      query,
      boolType
    )
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

    minimumShouldMatch (str) {
      addMinimumShouldMatch(str)
      return this
    },

    getQuery () {
      return query
    },

    hasQuery () {
      return !!_.size(query)
    }
  }
}
