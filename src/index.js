import _ from 'lodash'
import queryBuilder from './query-builder'
import filterBuilder from './filter-builder'
import aggregationBuilder from './aggregation-builder'
import { sortMerge, build, buildV1 } from './utils'

/**
 * **http://bodybuilder.js.org**
 *
 * **https://github.com/danpaz/bodybuilder**
 *
 * Bodybuilder is a small library that makes elasticsearch queries easier to
 * write, read, and maintain 💪. The whole public api is documented here, but
 * how about a simple example to get started:
 *
 * ```
 * bodybuilder()
 *   .query('match', 'message', 'this is a test')
 *   .build()
 *
 * // results in:
 * {
 *   query: {
 *     match: {
 *       message: 'this is a test'
 *     }
 *   }
 * }
 * ```
 *
 * You can chain multiple methods together to build up a more complex query.
 *
 * ```
 * bodybuilder()
 *   .query('match', 'message', 'this is a test')
 *   .filter('term', 'user', 'kimchy')
 *   .notFilter('term', 'user', 'cassie')
 *   .aggregation('terms', 'user')
 *   .build()
 * ```
 *
 * For nested sub-queries or sub-aggregations, pass a function as the last
 * argument and build the nested clause in the body of that function. For
 * example:
 *
 * ```
 * bodybuilder()
 *   .query('nested', 'path', 'obj1', (q) => {
 *     return q.query('match', 'obj1.color', 'blue')
 *   })
 *   .build()
 * ```
 *
 * The entire elasticsearch query DSL is available using the bodybuilder api.
 * There are many more examples in the docs as well as in the tests.
 *
 * @return {bodybuilder} Builder.
 */
export default function bodybuilder () {
  let body = {}

  return Object.assign(
    {
      /**
       * Set a sort direction on a given field.
       *
       * @param  {String} field             Field name.
       * @param  {String} [direction='asc'] A valid direction: 'asc' or 'desc'.
       * @returns {bodybuilder} Builder.
       */
      sort(field, direction = 'asc') {
        body.sort = body.sort || []

        if (_.isArray(field)) {

            if(_.isPlainObject(body.sort)) {
                body.sort = [body.sort]
            }

            if(_.isArray(body.sort)) {
                _.each(field, (sorts) => {
                    _.each(sorts, (value, key) => {
                        sortMerge(body.sort, key, value)
                    })
                })
            }
        } else {
          sortMerge(body.sort, field, direction)
        }
        return this
      },

      /**
       * Set a *from* offset value, for paginating a query.
       *
       * @param  {Number} quantity The offset from the first result you want to
       *                           fetch.
       * @returns {bodybuilder} Builder.
       */
      from(quantity) {
        body.from = quantity
        return this
      },

      /**
       * Set a *size* value for maximum results to return.
       *
       * @param  {Number} quantity Maximum number of results to return.
       * @returns {bodybuilder} Builder.
       */
      size(quantity) {
        body.size = quantity
        return this
      },

      /**
       * Set any key-value on the elasticsearch body.
       *
       * @param  {String} k Key.
       * @param  {any}    v Value.
       * @returns {bodybuilder} Builder.
       */
      rawOption(k, v) {
        body[k] = v
        return this
      },

      /**
       * Collect all queries, filters, and aggregations and build the entire
       * elasticsearch query.
       *
       * @param  {string} [version] (optional) Pass `'v1'` to build for the
       *                            elasticsearch 1.x query dsl.
       *
       * @return {Object} Elasticsearch query body.
       */
      build(version) {
        const queries = this.getQuery()
        const filters = this.getFilter()
        const aggregations = this.getAggregations()

        if (version === 'v1') {
          return buildV1(body, queries, filters, aggregations)
        }

        return build(body, queries, filters, aggregations)
      }

    },
    queryBuilder(),
    filterBuilder(),
    aggregationBuilder()
  )
}

module.exports = bodybuilder
