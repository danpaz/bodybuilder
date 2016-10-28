import { cloneDeep } from 'lodash'
import filters from './index'
import { boolMerge } from '../utils'

export default class FilterBuilder {
  constructor () {
    this._filters = {}
  }
  /**
   * Apply a filter of a given type providing all the necessary arguments,
   * passing these arguments directly to the specified filter builder. Merges
   * existing filter(s) with the new filter.
   *
   * @private
   *
   * @param  {String}  type Name of the filter type.
   * @param  {...args} args Arguments passed to filter builder.
   * @returns {FilterBuilder} Builder class.
   */
  filter(type, ...args) {
    this._filter('and', type, ...args)
    return this
  }

  _filter(boolType, filterType, ...args) {
    let klass = filters[filterType]
    let newFilter

    if (!klass) {
      throw new TypeError(`Filter type ${filterType} not found.`)
    }

    newFilter = klass(...args)
    this._filters = boolMerge(newFilter, this._filters, boolType)
    return this
  }

  /**
   * Alias to FilterBuilder#filter.
   *
   * @private
   *
   * @returns {FilterBuilder} Builder class.
   */
  andFilter(...args) {
    return this._filter('and', ...args)
  }

  orFilter(type, ...args) {
    this._filter('or', type, ...args)
    return this
  }

  notFilter(type, ...args) {
    this._filter('not', type, ...args)
    return this
  }

  get filters () {
    return cloneDeep(this._filters)
  }
}
