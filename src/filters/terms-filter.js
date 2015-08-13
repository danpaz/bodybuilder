import Filter from './filter'

export default class TermsFilter extends Filter {

  // terms is an Array
  constructor(field, terms, opts) {
    super()
    this.term = {}
    this.term[field] = terms
  }

}
