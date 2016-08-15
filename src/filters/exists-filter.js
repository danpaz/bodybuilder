/**
 * Construct an Exists filter.
 *
 * @param  {String} field Field name to check existence.
 * @return {Object}       Exists filter.
 */
export default function existsFilter(field) {
  return {
    exists: {
      field
    }
  }
}
