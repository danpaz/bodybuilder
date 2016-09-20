import filters from './index'

/**
 * Construct a Nested filter: a filter inside a filter.
 *
 * See: elastic.co/guide/en/elasticsearch/reference/current/query-dsl-nested-filter.html
 *
 * @memberof Filters
 *
 * @param  {String} path  Name of the field containing the nested fields.
 * @param  {String} type  Name of the desired nested filter.
 * @param  {String} field Name of the nested field.
 * @param  {Array}  args  Remaining arguments used to construct nested filter.
 * @return {Object}       Nested filter.
 */
export default function nestedFilter(path, type, field, ...args) {
  let klass = filters[type]
  let nestedField = `${path}.${field}`
  let filter

  if (!klass) {
    throw new Error('Filter type not found.', type)
  }

  filter = klass(nestedField, ...args)

  return {
    nested: {
      path: path,
      filter: filter
    }
  }
}
