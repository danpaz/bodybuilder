/**
 * Construct an Ids filter.
 *
 * @memberof Filters
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
