/**
 * Construct an Exists filter.
 *
 * @param  {String} field Field name to query over.
 * @param  {String} term  Query value.
 * @return {Object}       Exists filter.
 */
export default function existsFilter(field, term) {
  return {
    exists: {
      [field]: term
    }
  }
}
