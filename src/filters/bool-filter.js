import Filter from './filter'

export default class BoolFilter extends Filter {

  constructor() {
    super()
    this.bool = {}
  }

  and(filter) {
    this.bool.must = [filter]
    return this
  }

  not(filter) {
    this.bool.must_not = [filter]
    return this
  }

  or(filter) {
    this.bool.should = [filter]
    return this
  }

}
