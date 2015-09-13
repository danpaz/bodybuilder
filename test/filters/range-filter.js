import rangeFilter from '../../src/filters/range-filter'
import {expect} from 'chai'

describe('rangeFilter', () => {

  it('should create a range filter', () => {
    let result = rangeFilter('born', {lte: 'now', gte: '30d'})
    expect(result).to.eql({
      range: {
        born: {
          lte: 'now',
          gte: '30d'
        }
      }
    })
  })

})

