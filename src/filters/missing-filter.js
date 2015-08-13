import Filter from './filter'

export default class MissingFilter extends Filter {

  constructor(field, term, opts) {
    super()
    this.missing = {}
    this.missing[field] = term
  }

}
