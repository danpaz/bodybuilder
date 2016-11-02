import _ from 'lodash'

/**
 * Construct a Reverse nested aggregation.
 *
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-reverse-nested-aggregation.html|ES docs}
 *
 * @memberof Aggregations
 *
 * @param  {String} [name] Aggregation name. Defaults to agg_reverse_nested.
 * @param  {Object} opts   Additional options to include in the aggregation.
 * @return {Object}        Reverse nested aggregation.
 */
export default function reverseNestedAggregation(name, opts) {
  if (_.isObject(name)) {
    [name, opts] = [opts, name]
  }

  name = name || 'agg_reverse_nested'

  return {
    [name]: {
      reverse_nested: _.assign({}, opts)
    }
  }
}
