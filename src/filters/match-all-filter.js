/**
 * Construct a Match All filter.
 *
 * @memberof Filters
 *
 * @return {Object} Match All filter.
 */
export default function matchAllFilter() {
  return {
    match_all: {}
  }
}
