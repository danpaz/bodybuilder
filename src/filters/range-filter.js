/**
 * Construct a Range filter.
 *
 * @param  {String} field  Field name to query over.
 * @param  {Object} ranges One or more range queries.
 * @return {Object}        Range filter.
 */
export default function rangeFilter(field, ranges) {
  return {
    range: {
      [field]: ranges
    }
  }
}
