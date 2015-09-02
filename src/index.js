import _ from 'lodash'
import TermFilter from './filters/term-filter'

const FILTERS_MAP = {
  term: TermFilter
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

  _addFilter(filter) {
    if (_.isEmpty(this.query)) {
      this.query = {filter: filter}
    }
  }

  filter(type, ...args) {
    let klass = FILTERS_MAP[type];
    let filter;

    if (!klass) {
      throw new Error('Filter type not found.', type);
    }

    filter = new klass(...args)
    this._addFilter(filter)
    return this
  }

}
