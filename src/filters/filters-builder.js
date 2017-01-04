import { cloneDeep } from 'lodash'
import filters from './index'
import { mergeConcat } from '../utils'

export default class FiltersBuilder {
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
   * @param  {String}  name Name of the filter.
   * @param  {String}  type Name of the filter type.
   * @param  {...args} args Arguments passed to filter builder.
   * @returns {FilterBuilder} Builder class.
   */
  filter(name, type, ...args) {
    let klass = filters[type]
    let newFilter

    if (!klass) {
      throw new TypeError(`Filter type ${type} not found.`)
    }

    newFilter = {}
    newFilter[name] = klass(...args)

    this._filters = mergeConcat({}, newFilter, this._filters)
    return this
  }

  get filters () {
    return cloneDeep(this._filters)
  }
}
