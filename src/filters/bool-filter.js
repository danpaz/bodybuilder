import Filter from './filter'

export default class BoolFilter extends Filter {

  constructor(musts, mustNots, shoulds) {
    super()
    this.bool = {}
    if (musts) {
      this.bool.must = musts
    }
    if (mustNots) {
      this.bool.must_not = mustNots
    }
    if (shoulds) {
      this.bool.should = shoulds
    }
  }

}
