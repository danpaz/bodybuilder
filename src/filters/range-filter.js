import Filter from './filter'

export default class RangeFilter extends Filter {

  // ranges = {gte, lte}
  // opts = {time_zone}
  constructor(field, ranges) {
    super()
    this.range = {}
    this.range[field] = ranges
  }

}
