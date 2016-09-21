/**
 * Construct an Ids filter.
 *
 * @param  {Array} values Ids
 * @return {Object}       Ids filter.
 */
export default function idsFilter(values) {
  return {
    ids: {
      values
    }
  }
}
