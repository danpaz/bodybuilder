import Filter from './filter'

export default class ExistsFilter extends Filter {

  constructor(field, term, opts) {
    super()
    this.exists = {}
    this.exists[field] = term
  }

}
