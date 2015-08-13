import Filter from './filter'

export default class MatchAllFilter extends Filter {

  constructor() {
    super()
    this.match_all = {}
  }

}
