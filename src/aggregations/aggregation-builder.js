import _ from 'lodash'
import aggregations from './index'

const AggregationBuilder = {
  /**
   * Apply a aggregation of a given type providing all the necessary arguments,
   * passing these arguments directly to the specified aggregation builder.
   * Merges existing aggregation(s) with the new aggregation.
   *
   * @param  {String}  type Name of the aggregation type.
   * @param  {...args} args Arguments passed to aggregation builder. May include
   *                        a nest function as the last item.
   * @returns {AggregationBuilder} Builder object.
   */
  aggregation(type, ...args) {
    let klass = aggregations[type]
    let aggregation

    if (!klass) {
      throw new TypeError(`Aggregation type ${type} not found.`)
    }

    let nest = _.last(args)
    args = _.isFunction(nest) ? _.initial(args) : args
    aggregation = klass(...args)
    this._aggs = _.assign(this._aggs, aggregation)

    if (_.isFunction(nest)) {
      Object.setPrototypeOf(aggregation, AggregationBuilder)
      this._aggs[_.findKey(aggregation)].aggs = nest(aggregation)._aggs
    }
    return this
  },

  /**
   * Alias for `aggregation`.
   *
   * @param {...[Object]} args Arguments for `aggregation`.
   * @returns {AggregationBuilder} Builder object.
   */
  add(...args) {
    return this.aggregation(...args)
  },

  /**
   * Get the built aggregation object at its current state.
   * @return {Object} A read-only object describing the aggregations
   *                    built by this builder so far.
   */
  get aggregations() {
    return Object.freeze(this._aggs)
  }
}

export default AggregationBuilder;
