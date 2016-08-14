/**
 * Construct a filter with script for aggregation.
 *
 * @param  {String} filterName Filter Field name for reffernace.
 * @param  {String} filterRef Field name for filterName to referance in the aggrigation.
 * @param  {String} operator  Operator for script.
 * @param  {String} value  Value of script.
 * @return {Object}       Script Aggregation.
 */
export default function filterAggregation(filterName, filterRef, operator, value) {
  return {
    [filterName]: {
      bucket_selector: {
        buckets_path: {
          [filterName]: filterRef
        },
        script: `${filterName} ${operator} ${value}`
      }
    }
  }
}