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

  termFilter(field, term) {
    let filter = new TermFilter(field, term)
    this.query = {filter: filter}
    return this
  }

}
