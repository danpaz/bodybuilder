import RangeFilter from '../../src/filters/range-filter'
import {expect} from 'chai'

describe('RangeFilter', () => {

  it('should create a gte filter', () => {
    let result = new RangeFilter('born', {gte: 'now'})
    expect(result).to.eql({
      range: {
        born: {
          gte: 'now'
        }
      }
    })
  })

  it('should create a lte filter', () => {
    let result = new RangeFilter('born', {lte: 'now'})
    expect(result).to.eql({
      range: {
        born: {
          lte: 'now'
        }
      }
    })
  })

  it('should convert to string', () => {
    let result = new RangeFilter('born', {gte: 'now'})
    expect(result.toString()).to.equal('{"range":{"born":{"gte":"now"}}}')
  })

})

