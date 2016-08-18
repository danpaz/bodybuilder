/**
 * Construct a Children aggregation.
 *
 * @param  {String} type  Document type on which to join.
 * @param  {String} name  Aggregation name. Defaults to agg_histogram_<field>.
 * @return {Object}       Children aggregation.
 */
export default function childrenAggregation(type, name) {
  name = name || `agg_children_${type}`
  return {
    [name]: {
      children: {
        type: type
      }
    }
  }
}
