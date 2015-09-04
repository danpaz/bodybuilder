import _ from 'lodash'
import TermFilter from './filters/term-filter'
import BoolFilter from './filters/bool-filter'

const FILTERS_MAP = {
  term: TermFilter
}

function mergeConcat(target) {
  let args = Array.prototype.slice.call(arguments, 1)

  args.unshift(target)
  args.push(function concatArray(a, b) {
    if (Array.isArray(a)) {
      return a.concat(b)
    }
  })

  return _.merge.apply(null, args)
}

export default class BodyBuilder {

  constructor() {
    this.query = {}
  }

  sort(direction) {
    this.sort = direction
    return this
  }

  size(quantity) {
    this.size = quantity
    return this
  }

  _addFilter(boolFilterType, filter) {
    let currentFilters = this.query.filter
    let boolCurrent
    let boolNew

    // First argument is optional, defaults to 'and'.
    //
    if(boolFilterType && !filter) {
      filter = boolFilterType
      boolFilterType = 'and'
    }

    // Only one filter, no need for bool filters.
    //
    if (!currentFilters) {
      this.query.filter = filter
      return this
    }

    // We have a single existing non-bool filter, need to merge with new.
    //
    boolNew = new BoolFilter()[boolFilterType](filter)

    if (!currentFilters.bool) {
      boolCurrent = new BoolFilter()[boolFilterType](currentFilters)
      this.query.filter = mergeConcat({}, boolCurrent, boolNew)
      return this
    }

    // We have multiple existing filters, need to merge with new.
    //
    this.query.filter = mergeConcat({}, currentFilters, boolNew)

    return this
  }

  filter(type, ...args) {
    let klass = FILTERS_MAP[type]
    let filter

    if (!klass) {
      throw new Error('Filter type not found.', type)
    }

    filter = new klass(...args)
    return this._addFilter(filter)
  }

  orFilter(type, ...args) {
    let klass = FILTERS_MAP[type]
    let filter

    if (!klass) {
      throw new Error('Filter type not found.', type)
    }

    filter = new klass(...args)
    return this._addFilter('or', filter)
  }

  notFilter(type, ...args) {
    let klass = FILTERS_MAP[type]
    let filter

    if (!klass) {
      throw new Error('Filter type not found.', type)
    }

    filter = new klass(...args)
    return this._addFilter('not', filter)
  }

}
