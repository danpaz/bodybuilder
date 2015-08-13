import Filter from './filter'

export default class PrefixFilter extends Filter {

  constructor(field, prefixTerm, opts) {
    super()
    this.prefix = {}
    this.prefix[field] = prefixTerm
  }

}
