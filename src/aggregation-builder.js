import _ from 'lodash'
import { buildClause } from './utils'
import filterBuilder from './filter-builder'

export default function aggregationBuilder () {
  let aggregations = {}

  function makeAggregation (type, field, ...args) {
    const aggName = _.find(args, _.isString) || `agg_${type}_${field}`
    const opts = _.find(args, _.isPlainObject)
    const nested = _.find(args, _.isFunction)
    const nestedClause = {}
    const metadata = {}

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

    if (opts && opts._meta) {
      Object.assign(metadata, { meta : opts._meta })
      _.unset(opts, '_meta')
    }

    const innerClause = Object.assign({}, {
      [type]: buildClause(field, null, opts)
    }, metadata, nestedClause)

    Object.assign(aggregations, {
      [aggName]: innerClause
    })
  }

  return {
    /**
     * Add an aggregation clause to the query body.
     *
     * @param  {string|Object} type      Name of the aggregation type, such as
     *                                   `'sum'` or `'terms'`.
     * @param  {string}        field     Name of the field to aggregate over.
     * @param  {Object}        [options] (optional) Additional options to
     *                                   include in the aggregation.
     *                         [options._meta] associate a piece of metadata with individual aggregations
     * @param  {string}        [name]    (optional) A custom name for the
     *                                   aggregation, defaults to
     *                                   `agg_<type>_<field>`.
     * @param  {Function}      [nest]    (optional) A function used to define
     *                                   sub-aggregations as children. This
     *                                   _must_ be the last argument.
     *
     * @return {bodybuilder} Builder.
     *
     * @example
     * bodybuilder()
     *   .aggregation('max', 'price')
     *   .build()
     *
     * bodybuilder()
     *   .aggregation('percentiles', 'load_time', {
     *     percents: [95, 99, 99.9]
     *   })
     *   .build()
     *
     * bodybuilder()
     *   .aggregation('date_range', 'date', {
     *     format: 'MM-yyy',
     *     ranges: [{ to: 'now-10M/M' }, { from: 'now-10M/M' }]
     *   })
     *   .build()
     *
     * bodybuilder()
     *   .aggregation('diversified_sampler', 'user.id', { shard_size: 200 }, (a) => {
     *     return a.aggregation('significant_terms', 'text', 'keywords')
     *   })
     *   .build()
     *
     * bodybuilder()
     *   .aggregation('terms', 'title', {
     *      _meta: { color: 'blue' }
     *    }, 'titles')
     *   .build()
     *
     */
    aggregation (...args) {
      makeAggregation(...args)
      return this
    },

    /**
     * Alias for `aggregation`.
     *
     * @return {bodybuilder} Builder.
     */
    agg (...args) {
      return this.aggregation(...args)
    },

    getAggregations () {
      return aggregations
    },

    hasAggregations () {
      return !_.isEmpty(aggregations)
    }
  }
}
