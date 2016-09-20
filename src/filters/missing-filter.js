/**
 * Construct a Missing filter.
 *
 * @memberof Filters
 *
 * @param  {String} field Field name to check if missing.
 * @return {Object}       Missing filter.
 */
export default function missingFilter(field) {
  return {
    missing: {
      field
    }
  }
}
