import isPlainObject from 'lodash.isplainobject'
import merge from 'lodash.merge'
import cloneDeep from 'lodash.clonedeep'
import queryBuilder from './query-builder'
import filterBuilder from './filter-builder'
import aggregationBuilder from './aggregation-builder'
import suggestionBuilder from './suggestion-builder'
import { sortMerge, isEmpty, isString, set } from './utils'

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
 * argument and build the nested clause in the body of that function. Note that
 * you must `return` the builder object in the nested function. For example:
 *
 * ```
 * bodybuilder()
 *   .query('nested', 'path', 'obj1', (q) => {
 *     return q.query('match', 'obj1.color', 'blue')
 *   })
 *   .build()
 * ```
 *
 *
 *
 * The entire elasticsearch query DSL is available using the bodybuilder api.
 * There are many more examples in the docs as well as in the tests.
 *
 * @param  {Object} newBody Body to initialise with
 * @param  {Object} newQueries Queries to initialise with
 * @param  {Object} newFilters Filters to initialise with
 * @param  {Object} newAggregations Aggregations to initialise with
 * @param  {Object} newSuggestions Suggestions to initialise with
 * @return {bodybuilder} Builder.
 */
export default function bodybuilder (newBody, newQueries, newFilters, newAggregations, newSuggestions) {
  let body = newBody || {}

  return Object.assign(
    {
      /**
       * Set a sort direction on a given field.
       *
       * ```
       * bodybuilder()
       *   .sort('timestamp', 'desc')
       *   .build()
       * ```
       * You can sort multiple fields at once
       *
       * ```
       * bodybuilder()
       *  .sort([
       *    {"categories": "desc"},
       *    {"content": "asc"}
       *  ])
       *   .build()
       * ```
       * Geo Distance sorting is also supported & it's the only sort type that allows for duplicates
       *
       * ```
       * bodyBuilder().sort([
       *     {
       *       _geo_distance: {
       *         'a.pin.location': [-70, 40],
       *         order: 'asc',
       *         unit: 'km',
       *         mode: 'min',
       *         distance_type: 'sloppy_arc'
       *       }
       *     },
       *     {
       *       _geo_distance: {
       *         'b.pin.location': [-140, 80],
       *         order: 'asc',
       *         unit: 'km',
       *         mode: 'min',
       *         distance_type: 'sloppy_arc'
       *       }
       *     }
       *   ])
       *   .sort([
       *     { timestamp: 'desc' },
       *     { content: 'desc' },
       *     { content: 'asc' },
       *    {"price" : {"order" : "asc", "mode" : "avg"}}
       *   ])
       * .build()
       * ```
       *
       * @param  {String} field             Field name.
       * @param  {String} [direction='asc'] A valid direction: 'asc' or 'desc'.
       * @returns {bodybuilder} Builder.
       */
      sort(field, direction = 'asc') {
        body.sort = body.sort || []

        if (Array.isArray(field)) {

            if(isPlainObject(body.sort)) {
                body.sort = [body.sort]
            }

            if(Array.isArray(body.sort)) {
                field.forEach((sorts) => {
                    if(isString(sorts)) {
                        return sortMerge(body.sort, sorts, direction)
                    }
                    Object.entries(sorts).forEach(([key, value]) => {
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
        const suggestions = this.getSuggestions()

        if (version === 'v1') {
          return _buildV1(body, queries, filters, aggregations)
        }

        return _build(body, queries, filters, aggregations, suggestions)
      },

      /**
       * Returns a cloned instance of bodybuilder
       *
       * ```
       * const bodyA = bodybuilder().size(3);
       * const bodyB = bodyA.clone().from(2); // Doesn't affect bodyA
       * // bodyA: { size: 3 }
       * // bodyB: { size: 3, from: 2 }
       * ```
       *
       * @return {bodybuilder} Newly cloned bodybuilder instance
       */
      clone() {
        const queries = this.getRawQuery()
        const filters = this.getRawFilter()
        const aggregations = this.getRawAggregations()
        const suggestions = this.getSuggestions()

        return bodybuilder(...[body, queries, filters, aggregations, suggestions].map(obj => cloneDeep(obj)))
      }

    },
    queryBuilder(undefined, newQueries),
    filterBuilder(undefined, newFilters),
    aggregationBuilder(newAggregations),
    suggestionBuilder(newSuggestions)
  )
}

function _buildV1(body, queries, filters, aggregations) {
  let clonedBody = cloneDeep(body)

  if (!isEmpty(filters)) {
    set(clonedBody, 'query.filtered.filter', filters)

    if (!isEmpty(queries)) {
      set(clonedBody, 'query.filtered.query', queries)
    }

  } else if (!isEmpty(queries)) {
    set(clonedBody, 'query', queries)
  }

  if (!isEmpty(aggregations)) {
    set(clonedBody, 'aggregations', aggregations)
  }
  return clonedBody
}

function _build(body, queries, filters, aggregations, suggestions) {
  let clonedBody = cloneDeep(body)

  if (!isEmpty(filters)) {
    let filterBody = {}
    let queryBody = {}
    set(filterBody, 'query.bool.filter', filters)
    if (!isEmpty(queries.bool)) {
      set(queryBody, 'query.bool', queries.bool)
    } else if (!isEmpty(queries)) {
      set(queryBody, 'query.bool.must', queries)
    }
    merge(clonedBody, filterBody, queryBody)
  } else if (!isEmpty(queries)) {
    set(clonedBody, 'query', queries)
  }

  if (!isEmpty(aggregations)) {
    set(clonedBody, 'aggs', aggregations)
  }

  if (!isEmpty(suggestions)) {
    set(clonedBody, 'suggest', suggestions)
  }

  return clonedBody
}

module.exports = bodybuilder
