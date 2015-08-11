import Filter from './filter'

export default class TermFilter extends Filter {

  // opts = {_cache}
  constructor(field, term, opts) {
    super()
    this.term = {}
    this.term[field] = term
  }

}
