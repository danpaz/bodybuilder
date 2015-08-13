import _ from 'lodash'
import TermFilter from './filters/term-filter'

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

  termFilter(field, term) {
    let filter = new TermFilter(field, term)
    this._addFilter(filter)
    return this
  }

}
