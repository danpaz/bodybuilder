/**
 * Construct a Range query.
 *
 * @param  {String} field  Field name to query over.
 * @param  {Object} ranges One or more range queries.
 * @return {Object}        Range query.
 */
export default function rangeQuery(field, ranges) {
  return {
    range: {
      [field]: ranges
    }
  }
}
