import _ from 'lodash'
import aggregations from './index'

const AggregationBuilder = {
  /**
   * Apply a aggregation of a given type providing all the necessary arguments,
   * passing these arguments directly to the specified aggregation builder.
   * Merges existing aggregation(s) with the new aggregation.
   *
   * @private
   *
   * @param  {String}  type Name of the aggregation type.
   * @param  {...args} args Arguments passed to aggregation builder. May include
   *                        a nest function as the last item.
   * @returns {AggregationBuilder} Builder object.
   */
  aggregation(type, ...args) {
    let klass = aggregations[type]
    let aggregation = Object.create(AggregationBuilder)

    if (!klass) {
      throw new TypeError(`Aggregation type ${type} not found.`)
    }

    // If last argument is a nesting function, remove it
    // from `args` before building the aggregation
    let nest = _.last(args)
    args = _.isFunction(nest) ? _.initial(args) : args

    // Mixin to assign newly built aggregation properties
    // to the `AggregationBuilder`
    _.assign(aggregation, klass(...args))

    // Extend the current aggregation object with the
    // recently built aggregation
    this._aggs = _.assign(this._aggs, aggregation)

    if (_.isFunction(nest)) {
      // Resolve the nested aggregation and set it as a
      // child of the current aggregation
      this._aggs[_.findKey(aggregation)].aggs = nest(aggregation)._aggs
    }
    return this
  },

  /**
   * Alias for `aggregation`.
   *
   * @private
   *
   * @param {...[Object]} args Arguments for `aggregation`.
   * @returns {AggregationBuilder} Builder object.
   */
  add(...args) {
    return this.aggregation(...args)
  },

  /**
   * Get the built aggregation object at its current state.
   *
   * @private
   *
   * @return {Object} A shallow copy of the internal object describing
   *                    the aggregations built by this builder so far.
   */
  get aggregations() {
    return _.clone(this._aggs)
  }
}

export default AggregationBuilder;
