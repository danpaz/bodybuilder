export default class Filter {

  constructor() {
    Filter.filtersMade++
  }

  toString() {
    return JSON.stringify(this)
  }

  static get filtersMade() {
    return !this._count ? 0 : this._count
  }

  static set filtersMade(val) {
    this._count = val
  }

}
